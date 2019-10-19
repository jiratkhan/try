const express = require('express')
const mongodb = require('mongodb')
const bcrypt = require('bcryptjs')
const app = express()
const port = process.env.port
const MONGO_URL =process.env.MONGODB_URL
const MongoClient = mongodb.MongoClient

app.use(express.json())

app.post('/register', async (req, res) =>{
    let name = req.body.name
    let email = req.body.email
    let studentID = req.body.studentID
    let encryptedPW = await bcrypt.hash(req.body.password, 8)

    const o = {
        name: name,
        email: email,
        studentID: studentID,
        password: encryptedPW
    }

    const client = await require('./db')
/*const client = await MongoClient.connect(MONGO_URL,{
    useNewUrlParser:true,
    useUnifiedTopology: true
}).catch((err) =>{
    console.error(`Cannot connect ${err}`)
    res.status(500).json({error: err})
    return
})*/

const db = client.db('buu')
const r = await db.collection ('users')
            .insertOne(o)
            .catch((err) => {
                console.error(`Cannot insert ${err} `)
            })


    let result = { _id : o.id, name : o.name, email : o.email, studentID : o.studentID}        
    res.status(201).json(result)

})

app.post('/sign-in', async (req, res) =>{
    let email = req.body.email
    let password = req.body.password
    const client = await require('./db')
    let db = client.db('buu')
    let user = await db.collection(`users`).findOne({email:email}).catch((err) => {
       res.status(500).json({errer:err})
    })
    let passwordIsvalid = await bcrypt.compare(password,user.password)
    if(!passwordIsvalid){
        res.status(401).json({error: `username/password is not match`})
        return
    }
    res.status(201).json({token : "1234232"})
})

app.listen(port, () => {
    console.log(`App started at port ${port}`)
})