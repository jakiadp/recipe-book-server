const express = require('express');
const cors = require('cors');
require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// use:recipe_book
// pass:htixDZjAyMhkzyWi




const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.USER_PASS}@cluster0.mn2bxax.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

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

const recipesCollection = client.db('recipeDB').collection('recipes');

app.get('/recipes',async(req, res) =>{
  const result = await recipesCollection.find().toArray();
  res.send(result);
})

app.get('/recipes/:id', async(req, res)=> {
  const id = req.params.id;
  const query = {_id: new ObjectId(id)};
  const result = await recipesCollection.findOne(query);
  res.send(result);

})

 
    app.post('/recipes', async(req, res)=>{
      const  newRecipe = req.body;
      console.log(newRecipe);
      const result = await recipesCollection.insertOne(newRecipe);
      res.send(result)
    })

app.delete('/recipes/:id', async(req, res)=> {
  const id = req.params.id;
  const query = {_id: new ObjectId(id)};
  const result = await recipesCollection.deleteOne(query);
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




app.get('/',(req, res) =>{
    res.send('recipe')
});



app.listen(port,()=>{
    console.log(`recipe server running ${port}`)
});
