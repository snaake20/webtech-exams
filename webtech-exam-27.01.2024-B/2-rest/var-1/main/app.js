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

app.put('/people/:pid', async (req, res, next) => {
    const person = req.body;
    console.log(person)
    const id = req.params.pid;
    if (!Object.hasOwn(person, "name") || !Object.hasOwn(person, "category") || !Object.hasOwn(person, "job")) {
        return res.status(400).json({"message": "person replacement should have all keys"})
    }
    if (!["ACCOUNTANT", "PROGRAMMER", "RESEARCHER"].includes(person.job.toUpperCase())) {
        return res.status(400).json({"message": "invalid job"})
    }
    const db_query = await Person.findAll({where: {
        id: parseInt(id)
    }})
    console.log(db_query)
    if (db_query.length === 0) return res.status(404).json({"message": "not found"});
    if (Object.hasOwn(person, "id")) {
        delete person.id;
    }
    await Person.update(person, {
        where: {
            id: parseInt(id)
        }
    })
    res.status(202).json({"message": "accepted"})
})

app.use((err, req, res, next) => {
    console.warn(err)
    res.status(500).json({ message: 'server error' })
})

module.exports = app