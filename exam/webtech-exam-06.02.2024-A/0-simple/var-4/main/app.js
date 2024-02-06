const express = require('express')

const app = express()
app.use(express.static("public"))

app.locals.data = [{
    id: 1,
    name :  'jim',
    job : 'engineer'
},{
    id: 2,
    name :  'tim',
    job : 'accountant'
},{
    id: 3,
    name :  'ann',
    job : 'accountant'
}]

app.get('/employees', (req, res) => {
    res.status(200).json(app.locals.data)
})

app.get('/employees/:id', (req, res) => {
    let { id } = req.params
    console.warn(id)
    id = parseInt(id)
    const item = app.locals.data.find(e => e.id === id)
    if (item) {
        res.status(200).json(item)
    } else {
        res.status(404).json({ message: 'not found' })
    }
})

module.exports = app