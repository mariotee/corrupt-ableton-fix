import React from 'react'
import _ from 'lodash'

import * as Algs from './algs'

export default () => {
    const [stateFile, setStateFile] = React.useState()
    const [processing, setProcessing] = React.useState(false)
    const [outputJson, setOutputJson] = React.useState('')    

    const loadFile = (file) => {
        const reader = new FileReader()
        reader.onloadend = () => {
            setStateFile(reader.result)
        }
        reader.readAsText(file)
    }

    const processFile = async () => {
        setProcessing(true)
        
        setTimeout(() => {
            //get input
            const parsed = JSON.parse(stateFile)
            const list = []
            //get duplicate paths
            const res = Algs.findDuplicates(parsed.Ableton, "Ableton", 0, list)
            //lodash set non-unique ids to high (unlikely) number
            let idFix = 0
            res.map((e) => _.set(parsed, e.path, `${99999+(idFix++)}`))                
        
            setOutputJson(JSON.stringify(parsed))

            setProcessing(false)     
        }, 500)
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

        <button className="submit-json" onClick={processFile}>Get New JSON</button>
        
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