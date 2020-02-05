function keyEndsInId(name) {
    return name.match(/id$/i)
}

function noInnerObjects(obj) {
    for (const key of Object.keys(obj)) {
        if (obj[key] instanceof Object) {
            return false
        }
    }

    return true
}

function findDuplicates(node, parentPath, level, list) {
    const isObj = (element) => element instanceof Object && !(element instanceof Array)
    const isArr = (element) => element instanceof Object && (element instanceof Array)

    if (isObj(node)) {
        const vals = []

        for (const key of Object.keys(node)) {
            const path = parentPath + " > " + key

            if (vals.includes(node[key]) && keyEndsInId(key)) {
                list.push(`PATH = "${path}" ; VALUE = "${node[key]}"`)
            } else {
                vals.push(node[key])
            }

            findDuplicates(node[key], path, level+1, list)
        }
    } else if (isArr(node)) {
        const vals = []

        for (const index in node) {
            const arrayElement = node[index]
            
            if (noInnerObjects(arrayElement)) {
                for (const key of Object.keys(arrayElement)) {
                    const path = parentPath + " > " + key

                    if (vals.includes(arrayElement[key]) && keyEndsInId(key)) {
                        list.push(`PATH = "${path}" ; VALUE = "${arrayElement[key]}"`)
                    } else {
                        vals.push(arrayElement[key])
                    }
                }
            } else {
                findDuplicates(node[index], `${parentPath}[${index}]`, level+1, list)
            }
        }
    }
}

function loadedFile() {
    const filename = document.getElementById("filename")
    const file = document.getElementById("input-file").files[0]

    filename.innerHTML = "Uploaded " + file.name
}

function processFile() {
    const list = []
    const reader = new FileReader()
    const res = document.getElementById("result-text")
    const file = document.getElementById("input-file").files[0]

    res.innerHTML = null
    
    if (file.type !== "application/json") {
        alert('that is not a JSON file')
        return
    }

    reader.readAsText(file)

    reader.onload = (e) => {
        const json = JSON.parse(e.target.result)
        
        findDuplicates(json.Ableton, "Ableton", 0, list)

        const ul = document.createElement("UL")
        
        for (const item of list) {
            const li = document.createElement("LI")

            li.innerHTML = item

            ul.appendChild(li)
        }

        res.appendChild(ul)
    }
}