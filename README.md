# ableton-fix_corrupt-non-unique-ids
This script was created to easily find which keys have non-unique IDs in a corrupt Ableton Live Set (.als) file. This error happens when Ableton sometimes tweaks and writes a duplicate ID to the project XML (which is invalid).

WARNING: currently, this finds all XML nodes on the same level with duplicate values. Be sure, when you edit your project XML, that you only remove duplicates that contain "Id" or "ID"

# How to Use
1. Clone this repo
2. Zip/compress your .als file
3. Unzip to get the XML for your project
4. Go to https://codebeautify.org/xmltojson and get the JSON version of your file
5. Save this JSON to a new file (copy/paste is fine) called `input.json`
6. Put this file in the same folder as the `index.js` script
7. Run this node.js script
8. The outputted `res.txt` will show the paths of some duplicate keys
9. Ctrl/Cmd + F into the project XML and find those duplicate keys to remove

PS: currently, the algorithm is not perfect, but it should lead you in a direction to find other duplicate keys

PPS: any key that has a bracket [] means that it is part of an array (or collection of nodes). They start @ 0, so \[3\] really means the *fourth* element.

## TODO:
- Accept XML and do conversion to JSON in the program
- UI to make it so one just uploads file and gets list of key hierarchy
- Package to executable for both Windows and Mac
- (maybe) auto-remove duplicate keys; this can be risky lol
