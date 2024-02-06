function isShallowEqual(obj1, obj2, props) {
    if (typeof obj1 !== "object") {
        throw new Error("First input should be an object")
    }
    if (!Array.isArray(props)) {
        throw new Error("Third input should be an array")
    }
    if (!props.every((p) => typeof p === 'string')) {
        throw new Error("Each element should be a string")
    }
    // - funcția compară obiectul `obj1` cu obiectul `obj2`, comparația fiind shallow și luând în considerație doar proprietățile care se regăsesc în array-ul `props`
    // - Funcția compară corect două obiecte dacă au aceleași proprietăți; (0.5 pts)
    return props.every((p) => obj1[p] === obj2[p])
}

const app = {
    isShallowEqual
}

module.exports = app