function objectMap(o, f) {
    if (typeof o !== 'object'){
        throw new Error("First input should be an object")
    }
    if (typeof f !== 'function') {
        throw new Error("Second input should be a function")
    }
    if (Object.keys(o).length === 0) {
        return o;
    }
    Object.keys(o).forEach(k => {
        o[k] = f(o[k])
    })
    return o;
}

const app = {
    objectMap
}

module.exports = app