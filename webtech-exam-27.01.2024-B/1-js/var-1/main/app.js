function updateProperty(arr, prop, f) {
    if (!Array.isArray(arr)) {
        throw new Error("First input should be an array")
    }
    if (!arr.every((e) => typeof e === 'object')) {
        throw new Error("Each element should be an object")
    }
    if (typeof prop !== 'string') {
        throw new Error("Second input should be a string")
    }
    if (typeof f !== 'function') {
        throw new Error("Third input should be a function")
    }
    arr.forEach((e) => {
        if (Object.hasOwn(e, prop)) {
            e[prop] = f(e[prop])
        }
    })
}

const app = {
    updateProperty
}

module.exports = app