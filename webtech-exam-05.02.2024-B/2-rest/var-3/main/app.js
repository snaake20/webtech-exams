const express = require('express')
const Sequelize = require('sequelize')

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'my.db'
})

let Person = sequelize.define('person', {
    name : Sequelize.STRING,
    category : {
        type: Sequelize.STRING,
        validate: {
            len: [3, 10]
        },
        allowNull: false
    },
    job : Sequelize.STRING
},{
    timestamps : false
})


const app = express()

app.use(express.json())

app.get('/create', async (req, res) => {
    try{
        await sequelize.sync({force : true})
        for (let i = 0; i < 100; i++){
            let person = new Person({
                name: 'name ' + i,
                category: ['RETIRED', 'ACTIVE', 'UNKNOWN'][Math.floor(Math.random() * 3)],
                job: ['ACCOUNTANT', 'PROGRAMMER', 'RESEARCHER'][Math.floor(Math.random() * 3)]
            })
            await person.save()
        }
        res.status(201).json({message : 'created'})
    }
    catch(err){
        console.warn(err.stack)
        res.status(500).json({message : 'server error'})
    }
})

app.get('/people', async (req, res, next) => {
    try{
        const people = await Person.findAll();
        if (Object.keys(req.query).length == 0) {
            return res.status(200).send(JSON.stringify(people))
        }
        if (req.query.page && isNaN(parseInt(req.query.page))) {
            return res.status(400).json({message: "page should be a number"})
        }
        if (!req.query.pageSize) {
            const page = parseInt(req.query.page);
            const lower = (page - 1) * 10;
            const higher = page * 10;
            return res.status(200).send(JSON.stringify(people.splice(lower,higher)));
        }
        if (req.query.pageSize && isNaN(parseInt(req.query.pageSize))) {
            return res.status(400).json({message: "page size should be a number"})
        }
        const page = parseInt(req.query.page);
        const pageSize = parseInt(req.query.pageSize)
        const lower = (page - 1) * pageSize;
        const higher = page * pageSize;
        return res.status(200).send(JSON.stringify(people.splice(lower,higher)));
    }
    catch(err){
      next(err)        
    }
})

app.use((err, req, res, next) => {
    console.warn(err)
    res.status(500).json({ message: 'server error' })
})

module.exports = app