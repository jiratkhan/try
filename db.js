const mongodb = require('mongodb')
const MONGO_URL =process.env.MONGODB_URL
const MongoClient = mongodb.MongoClient

module.exports = (async () =>{
    const client = await MongoClient.connect(MONGO_URL,{
        useNewUrlParser:true,
        useUnifiedTopology: true
    })

    return client
}) ()

