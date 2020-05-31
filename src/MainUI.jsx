import React from 'react'
import * as Algs from './algs'

export default (props) => <div>
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
  <label htmlFor="input-file" className="file-input-label">Import your project JSON</label>
  <input id="input-file" type="file" onChange={Algs.loadedFile}/>
  <section id="filename">no file yet...</section>

  <button id="get-list" onClick={Algs.processFile}>Get List</button>

  <p id="result-text"></p>
</div>