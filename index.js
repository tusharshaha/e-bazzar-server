const { MongoClient } = require('mongodb')
const express = require('express');
const cors = require('cors');
const ObjectId = require('mongodb').ObjectId
require('dotenv').config()
const port = process.env.PORT || 5000;
const app = express()
app.use(cors())
app.use(express.json())


// verify server hitting
app.get('/', (req, res) => {
    res.send('server hitting')
})
// connect with port
app.listen(port, () => {
    console.log(`listening from http://localhost:${port} `)
})