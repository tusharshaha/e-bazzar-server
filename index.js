const { MongoClient } = require('mongodb')
const express = require('express');
const cors = require('cors');
const ObjectId = require('mongodb').ObjectId
require('dotenv').config()
const port = process.env.PORT || 5000;
const app = express()
app.use(cors())
app.use(express.json())

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.2xl13.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
async function run() {
    try {
        await client.connect();
        const database = client.db('E-Bazzar');
        const productCollections = database.collection('products')
        const orderCollections = database.collection('orders')


        // get all products
        app.get('/products', async (req, res) => {
            const products = await productCollections.find({}).toArray()
            res.send(products)
        })
        // get a single products
        app.get('/products/:id',async (req,res)=>{
            const productId = req.params.id;
            const query = {_id: ObjectId(productId)}
            const result = await productCollections.findOne(query);
            res.send(result);
        })
        // post an user order
        app.post('/orders', async(req,res)=>{
            const userOrder = req.body;
            const options = { ordered: true };
            const result = await orderCollections.insertMany(userOrder, options);
            res.json(result);
        })
        // get an user order
        app.get('/orders/:email', async (req, res) => {
            const userEmail = req.params.email;
            const query = { email: userEmail }
            const result = await orderCollections.find(query).toArray();
            res.send(result)
        })

    } finally {
        // await client.close()
    }
}
run().catch(console.dir)
// verify server hitting
app.get('/', (req, res) => {
    res.send('server hitting')
})
// connect with port
app.listen(port, () => {
    console.log(`listening from http://localhost:${port} `)
})