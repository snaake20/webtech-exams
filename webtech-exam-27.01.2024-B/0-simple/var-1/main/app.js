const express = require('express')

const app = express()
app.use(express.static('public'))

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
    res.status(200).json(app.locals.data)
})

module.exports = app