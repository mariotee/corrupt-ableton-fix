const json = require("./input.json")
const fs = require("fs")
const filename = "./res.txt"

fs.writeFileSync(filename, "\n")

function appendIndents(file, multiple) {
    for (let i = 0; i < multiple; ++i) {
        fs.appendFileSync(file, '-')
    }           
}

function findDuplicates(node, parentKey, level) {
    const isObj = (element) => element instanceof Object && !(element instanceof Array)
    const isArr = (element) => element instanceof Object && (element instanceof Array)

    if (isObj(node)) {    
        appendIndents(filename, level)
        fs.appendFileSync(filename,parentKey)
        fs.appendFileSync(filename,"\n")
        const vals = []
        for (const key of Object.keys(node)) {
            if (vals.includes(node[key])) {                     
                fs.appendFileSync(filename,`DUPE (${key}): ${node[key]}`)
                fs.appendFileSync(filename,"\n")
            } else {
                vals.push(node[key])
            }            

            findDuplicates(node[key], key, level+1)
        }
    } else if (isArr(node)) {
        for (const index in node) {
            findDuplicates(node[index], `${parentKey}[${index}]`, level+1)
        }
    } else {
        //console.log(r)
    }
}

//main
let n = Date.now()
findDuplicates(json, "root",0)
console.log(`this took ${(Date.now() - n)/1000.0} seconds`)
