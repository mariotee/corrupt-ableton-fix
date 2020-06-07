import React from 'react'
import XmlJs from 'xml2js'

import * as Algs from './algs'

export default () => {
    let reader
        
    const [stateFile, setStateFile] = React.useState()
    const [processing, setProcessing] = React.useState(false)
    const [xml, setXml] = React.useState('')
    
    const readFile = () => {
        setStateFile(reader.result)
    }

    const loadFile = (file) => {
        reader = new FileReader()
        reader.onloadend = readFile
        reader.readAsText(file)
    }

    const processFile = () => {
        setProcessing(true)
        XmlJs.parseString(stateFile, (err, parsed) => {
            if (err) {
                console.log(err)
                return
            }              
            
            const list = []
            
            const res = Algs.findDuplicates(parsed.Ableton, "Ableton", 0, list)
            const paths = res.map((e) => e.path)
            let i = 0

            for (const path of paths) {
                let query = "parsed"
                query += path.split('.').map((e) => {
                    if (/\[\d+\]$/gim.test(e)) {
                        let it = e.split('[')
                        return `['${it[0]}'][${it[1]}`
                    } else {
                        return `['${e}']`
                    }
                }).join('')                

                let thing = `if(${query}) {            
                    ${query} = "99999${i++}"
                }`

                eval(thing)
            }
                        
            setXml(new XmlJs.Builder().buildObject(parsed))
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
                Once you click "Get New Xml", you will see a bunch of text render in the box below. Copy/Paste this to a new file and
                make sure it ends with ".als"
            </li>
            <li>
                DISCLAIMER: this project is still being optimised. I am not liable for any damage done to your original file.
                This is why step 1 is absolutely crucial. You should still send your file to Ableton support to see if they can fix it.
                They will definitely do a much better job than this tool.
            </li>
        </ol>
        <div>Import your project XML</div>
        <input type="file" onChange={(e) => loadFile(e.target.files[0])}/>

        <button onClick={processFile}>Get New Xml</button>
        
        <section>
        { processing ? <div>processing...</div> : null }
        </section>
        <section>
            <textarea readOnly rows={24} cols={80} value={xml}/>
        </section>
    </div>
}