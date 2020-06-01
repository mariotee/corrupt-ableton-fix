# ableton-fix_corrupt-non-unique-ids
This app was created to easily find which keys have non-unique IDs in a corrupt Ableton Live Set (.als) file. This error happens when Ableton sometimes tweaks and writes a duplicate ID to the project XML (which is invalid).

instructions displayed in app

PS: currently, the algorithm is not perfect, but it should lead you in a really good direction to find other duplicate keys

PPS: any key that has a bracket [] means that it is part of an array (or collection of nodes). They start @ 0, so \[3\] really means the *fourth* element.

## TODO:
- [x] Accept XML and do conversion to JSON in the program
- ~~[ ] Package to executable for both Windows and Mac~~ (now is web app)
- [ ] (maybe) auto-remove duplicate keys; this can be risky lol
