import React from 'react'

import * as Algs from './algs'

export default () => {
    let reader
    
    const [resultList, setResultList] = React.useState([])
    const [stateFile, setStateFile] = React.useState()
    const [processing, setProcessing] = React.useState(false)
    const [outputJson, setOutputJson] = React.useState('')    

    const readFile = () => {
        setStateFile(reader.result)
    }

    const loadFile = (file) => {
        reader = new FileReader()
        reader.onloadend = readFile
        reader.readAsText(file)
    }

    const processFile = async () => {
        setProcessing(true)
        const parsed = JSON.parse(stateFile)
        const list = []        
        const res = Algs.findDuplicates(parsed.Ableton, "Ableton", 0, list)

        setResultList([...res])

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
                ${query} = "${9999999+(i++)}"
            }`
            
            eval(thing)            
        }
        
        setOutputJson(JSON.stringify(parsed))
        
        setProcessing(false)        
    }
    
    return <div className="main-ui">
        <h1>Ableton Corrupted Ids Fix</h1>
        <p>
            To get started using this tool, you will need to do some tasks beforehand
        </p>
        <ol>
            <li>Make a copy of .als file and rename it, appending ".zip" to the end</li>
            <li>Unzip the new .zip file to get an uncompressed ALS file</li>
            <li>This is actually an XML file now, so upload the XML to <a href="https://www.convertjson.com/xml-to-json.htm">this site here</a></li>
            <li>This will convert to a JSON file; download it and upload here</li>
            <li>Click "Get New JSON" to get the text for the new JSON with duplicate keys renamed</li>
            <li>Copy/Paste the new JSON text to <a href="https://www.convertjson.com/json-to-xml.htm">this sibling site</a> to get XML back</li>
            <li>Be patient as it may take a long time to copy/paste long text</li>
            <li>Download result as XML, and then rename to ".als"; it should open in Ableton</li>
        </ol>
        <h3>Import your project JSON</h3>
        <input type="file" onChange={(e) => loadFile(e.target.files[0])}/>

        <button onClick={processFile}>Get New JSON</button>
        
        <section>
        {processing ? <h5>Processing...</h5> : null}
        <h3>Output JSON</h3>
        {<textarea readOnly rows={24} cols={80} value={outputJson}/>}           
        </section>

        <p className="disclaimer">
            DISCLAIMER: I am not liable for any damage done to your original file.
            This is why step 1 is absolutely crucial. You should still send your file to Ableton support to see if they can fix it.
            They will definitely do a much better job than this tool.
        </p>
    </div>
}