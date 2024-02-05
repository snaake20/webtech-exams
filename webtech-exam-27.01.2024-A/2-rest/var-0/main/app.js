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
        for (let i = 0; i < 10; i++){
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
        let people = await Person.findAll()
        res.status(200).json(people)
    }
    catch(err){
      next(err)        
    }
})

app.delete('/people', async (req, res, next) => {
    if (Object.keys(req.query).length == 0) {
        return res.status(400).json({"message": "nothing to delete"})
    }
    if (req.query.ids.split(",").some((c) => isNaN(parseInt(c)))) {
        return res.status(400).json({"message": "at least some ids are non numeric"})
    }
    const back = [];
    const ids = req.query.ids.split(",").map((c) => parseInt(c));
    await Promise.all(ids.map(async (id) => {
        const res = await Person.destroy({
            where: {
                id
            }
        })
        back.push({id, status: res == 1 ? "deleted" : "not found"})
    }))
    res.status(202).json(back)
})

app.use((err, req, res, next) => {
    console.warn(err)
    res.status(500).json({ message: 'server error' })
})

module.exports = app