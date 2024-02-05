function generator(initialState) {
    if (typeof initialState !== 'object') {
        throw new Error("First input should be an object")
    }
    return (prop, value) => {
        initialState[prop] = value;
    }
}

const app = {
    generator
}

module.exports = app