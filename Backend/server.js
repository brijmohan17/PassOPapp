if(process.env.NODE_ENV!=='production'){
  require('dotenv').config();
}

const express = require('express')
const { MongoClient } = require('mongodb')
const bodyParser = require('body-parser');
const dotenv = require('dotenv')
dotenv.config()
const cors = require('cors')
// Connection URL

const client = new MongoClient(process.env.MONGO_URI);

// Database Name
const dbName = 'passop';
const app = express()
const port = 3000
app.use(bodyParser.json())
app.use(cors())

client.connect();
//get all the password
app.get('/', async (req, res) => {

  const db = client.db(dbName)
  const collection = db.collection('passwords')
  const findResult = await collection.find({}).toArray();
  res.json(findResult)
})

//save  a password
app.post('/', async (req, res) => {
  const password = req.body
  const db = client.db(dbName)
  const collection = db.collection('passwords')
  const findResult = await collection.insertOne(password);
  res.send({ success: true, result: findResult })
})
//delete  a password by id
app.delete('/', async (req, res) => {
  const password = req.body
  const db = client.db(dbName)
  const collection = db.collection('passwords')
  const findResult = await collection.deleteOne(password);
  res.send({ success: true, result: findResult })
})

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`)
})