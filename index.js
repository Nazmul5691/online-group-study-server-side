const express = require('express');
const cors = require('cors');
// const jwt = require('jsonwebtoken')
// const cookieParser = require('cookie-parser')
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()
const app = express();
const port = process.env.PORT || 5000;



//middleware
app.use(cors())
app.use(express.json())
// app.use(cookieParser())


console.log(process.env.DB_USER);
console.log(process.env.DB_PASS);





const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.laemifb.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();


    const featuresCollection = client.db('studyGroup').collection('features')
    const createAssignmentCollection = client.db('studyGroup').collection('assignment');


    //features 
    app.get('/features', async(req, res) =>{
        const curser = featuresCollection.find();
        const result = await curser.toArray();
        res.send(result)
    })


    app.post('/createAssignment', async(req, res) =>{
        const newCreateAssignment = req.body;
        // console.log(newCreateAssignment);
        const result = await createAssignmentCollection.insertOne(newCreateAssignment)
        res.send(result);
  
      })



    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);



app.get('/', (req, res) =>{
    res.send('online group study server is running');
})

app.listen(port, () =>{
    console.log(`online group study server is running on port ${port}`);
})