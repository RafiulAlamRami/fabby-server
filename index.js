require('dotenv').config()
const express=require('express')
const { MongoClient, ServerApiVersion, ObjectId} = require('mongodb');
const port=process.env.PORT || 5000

const cors=require('cors')
const app=express()

app.use(cors())
app.use(express.json())

// fabby_user
// mUBSwbtJGZWVxvt6




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.jvi5uyr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// const uri = "mongodb+srv://fabby_user:mUBSwbtJGZWVxvt6@cluster0.jvi5uyr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";



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
    // await client.connect();

    const craftCollection=client.db('craftdb').collection('craft')

   

    app.get('/craftItemSection',async(req,res)=>{

      const cursor=craftCollection.find()
      const result=await cursor.toArray()
      res.send(result)

    })

    app.get('/allArtAndCraftItems',async(req,res)=>{
      const cursor=craftCollection.find()
      const result=await cursor.toArray()
      res.send(result)
    })

    app.get('/craftItemviewDetails/:id',async(req,res)=>{
      const id=req.params.id
      const query={_id:new ObjectId(id)}
      const result=await craftCollection.findOne(query)
      res.send(result)
    })

    app.post('/addCraftItem',async(req,res)=>{
      const newCraftItem=req.body;
      console.log(newCraftItem);
      const result=await craftCollection.insertOne(newCraftItem)
      res.send(result)
  })
    // Send a ping to confirm a successful connection
    
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/',(req,res)=>{
    res.send("runninnnnnnnnnnnnnnng")
})

app.listen(port,(req,res)=>{
    console.log("from port of : ",port);
})