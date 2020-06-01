import React from 'react'
import XmlJs from 'xml2js'

import * as Algs from './algs'

export default (props) => {    
    let reader
    
    const [stateList, setStateList] = React.useState([])
    const [stateFile, setStateFile] = React.useState()
    const [processing, setProcessing] = React.useState(false)
    
    const readFile = () => {
        setStateFile(reader.result)
    }

    const loadFile = (file) => {
        reader = new FileReader()
        reader.onloadend = readFile
        reader.readAsText(file)
    }

    const processFile = () => {                           
        XmlJs.parseString(stateFile, (err, parsed) => {
            if (err) {
                console.log(err)
                return
            }
            setProcessing(true)
            Algs.findDuplicates(parsed.Ableton, "Ableton", 0, stateList)
            //TODO: find a better way to render this list from the algorithm itself
            setStateList([...stateList])
            setProcessing(false)
        });                         
    }
    
    return <div>
        <h1>Ableton Corrupted Ids Fix</h1>
        <p>
            To get started using this tool, you will need to do some tasks beforehand
        </p>
        <ol>
            <li>Make a copy of .als file and rename it, appending ".zip" to the end</li>
            <li>Unzip the new .zip file to get an uncompressed ALS file</li>
            <li>This is actually an XML file now, so upload the XML here</li>
            <li>
                Once you click "Get List", you will see a list of all the keys in your XML where there 
                are duplicate nodes that have their keys ending with "id"
            </li>
            <li>
                Use the error message from Ableton to help find the right duplicates to remove <br/>
                <em>for example:</em>
                <pre>
                    The document "______" is corrupt. (Non-unique Note ids)
                </pre>
                <em>This means that you should look for keys with duplicate "Note Id" values</em>
            </li>
        </ol>
        <div>Import your project XML</div>
        <input type="file" onChange={(e) => loadFile(e.target.files[0])}/>        

        <button onClick={processFile}>Get List</button>
        
        <section>
            <div>{processing && "processing..."}</div>
            <table>
                <thead>
                    <tr><td>PATH</td><td>VALUE</td></tr>                    
                </thead>
                <tbody>
                {
                    stateList.map((e, i) => <tr key={i}>
                        <td>{e.path}</td>
                        <td>{e.val}</td>
                    </tr>)
                }
                </tbody>            
            </table>
        </section>        
    </div>
}