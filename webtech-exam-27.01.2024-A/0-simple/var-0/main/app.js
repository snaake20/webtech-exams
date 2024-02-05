const express = require('express')

const app = express()
app.use(express.static("public"))
app.use(express.json())

app.locals.data = [{
    name :  'jim',
    job : 'engineer'
},{
    name :  'tim',
    job : 'accountant'
},{
    name :  'ann',
    job : 'accountant'
}]

app.get('/employees', (req, res) => {
    const { job } = req.query
    res.status(200).json(app.locals.data.filter(e => e.job === job))
})

module.exports = app