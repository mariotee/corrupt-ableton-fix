# ableton-fix_corrupt-non-unique-ids
This app was created to easily find which keys have non-unique IDs in a corrupt Ableton Live Set (.als) file. This error happens when Ableton sometimes tweaks and writes a duplicate ID to the project XML (which is invalid).

# How to Use
1. Clone this repo
2. Zip/compress your .als file
3. Unzip to get the XML for your project
4. Go to https://codebeautify.org/xmltojson and get the JSON version of your file
5. Save this JSON to a new file (copy/paste is fine)
6. Upload it to the Electron app UI
7. Click "Get List" to get the list of duplicate keys

PS: currently, the algorithm is not perfect, but it should lead you in a really good direction to find other duplicate keys

PPS: any key that has a bracket [] means that it is part of an array (or collection of nodes). They start @ 0, so \[3\] really means the *fourth* element.

## TODO:
- Accept XML and do conversion to JSON in the program
- Package to executable for both Windows and Mac
- (maybe) auto-remove duplicate keys; this can be risky lol
