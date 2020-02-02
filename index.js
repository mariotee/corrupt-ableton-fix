const json = require("./input.json")
const fs = require("fs")
const filename = "./res.txt"

fs.writeFileSync(filename, "\n")

function keyEndsInId(name) {
    return name.match(/id$/i)
}

function findDuplicates(node, parentPath, level) {
    const isObj = (element) => element instanceof Object && !(element instanceof Array)
    const isArr = (element) => element instanceof Object && (element instanceof Array)

    if (isObj(node)) {                
        const vals = []
        for (const key of Object.keys(node)) {
            const path = parentPath + " > " + key

            if (vals.includes(node[key]) && keyEndsInId(key)) {                               
                fs.appendFileSync(filename,`DUPE PATH = (${path}) ; VALUE = ${node[key]}`)
                fs.appendFileSync(filename,"\n")                
            }            

            vals.push(node[key])

            findDuplicates(node[key], path, level+1)
        }
    } else if (isArr(node)) {
        for (const index in node) {
            findDuplicates(node[index], `${parentPath}[${index}]`, level+1)
        }
    } else {
        //DEBUGGING
        //parentPath.match(/_noteid$/i) && console.log(parentPath)
    }
}

//main
const rootKey = "Ableton"
const initialLevel = 0

let n = Date.now()
findDuplicates(json.Ableton, rootKey, initialLevel)
console.log(`this took ${(Date.now() - n)/1000.0} seconds`)