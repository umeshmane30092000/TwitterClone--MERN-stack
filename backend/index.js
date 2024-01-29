const express = require('express')
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express()
const port = process.env.PORT || 5000;
require('dotenv').config();

app.use(cors());
app.use(express.json());


const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, { serverApi: { version: ServerApiVersion.v1, strict: true, deprecationErrors: true } });

// async function run() {
//   try {
//     await client.connect();
//     await client.db("admin").command({ ping: 1 });
//     console.log("Successfully connected to MongoDB!");
//   } finally {
//     await client.close();
//   }
// }
// run().catch(console.dir);

async function run() {
    try {
        await client.connect();
        console.log("Connected to MongoDB!"); // Added line
        const postCollection = client.db("database").collection("posts"); // this collection is for team-ekt
        const userCollection = client.db("database").collection("users"); // this collection is for team-srv


        app.get('/post', async (req, res) => {
            const post = (await postCollection.find().toArray()).reverse();
            res.send(post);
        })
        // get
        app.get('/user', async (req, res) => {
            const user = await userCollection.find().toArray();
            res.send(user);
        })

        app.get('/loggedInUser', async (req, res) => {
            const email = req.query.email;
            const user = await userCollection.find({ email: email }).toArray();
            res.send(user);
        })

        app.post('/post', async (req, res) => {
            const post = req.body;
            const result = await postCollection.insertOne(post);
            res.send(result);
        })

        // post
        app.post('/register', async (req, res) => {
            const user = req.body;
            const result = await userCollection.insertOne(user);
            res.send(result);
        })






    } catch (error) {
        console.log(error);
    }
} run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('Hello from Twitter Clone!')
})

app.listen(port, () => {
    console.log(`Twitter clone is listening on port ${port}`)
})
