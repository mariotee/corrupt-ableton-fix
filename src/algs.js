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

//TODO: return list concatenations rather than in-place push
export function findDuplicates(node, parentPath, level, list) {
    const isObj = (element) => (element instanceof Object) && !(element instanceof Array)
    const isArr = (element) => (element instanceof Object) && (element instanceof Array)
        
    if (isObj(node)) {
        const vals = []

        for (const key of Object.keys(node)) {
            const path = parentPath + "." + key

            if (vals.includes(node[key]) && keyEndsInId(key)) {
                list.push({path, val: node[key]})
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
                    const path = parentPath + "." + key

                    if (vals.includes(arrayElement[key]) && keyEndsInId(key)) {
                        list.push({path, val: arrayElement[key]})
                    } else {
                        vals.push(arrayElement[key])
                    }
                }
            } else {
                findDuplicates(node[index], `${parentPath}[${index}]`, level+1, list)
            }
        }     
    }

    return list
}