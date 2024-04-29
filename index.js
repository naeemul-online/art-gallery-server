const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
const port = process.env.PORT || 5000;
// import dotenv
require("dotenv").config();
// mongodb import

// middleware
app.use(cors());
app.use(express.json());

// const uri = "mongodb+srv://<username>:<password>@cluster0.ml8mugs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
// mongodb code start
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ml8mugs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
// console.log(uri);

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

    // db collection
    const craftCollection = client.db("craftDB").collection("craft");
    const categoryCollection = client.db("categoryDB").collection("category");

    // created api to receive data from client
    app.post("/addCraftItem", async (req, res) => {
      const newCraft = req.body;
      const result = await craftCollection.insertOne(newCraft);
    //   console.log(result)
      res.send(result);
    });


    /* category section api to access the data of mongodb */
    app.get("/categoryItem", async(req, res) => {
       // Execute query 
    const cursor = categoryCollection.find();
    const result = await cursor.toArray();
    res.send(result)
    })

    
    /* get access the data of mongodb */
    app.get("/allArtAndCraftItem", async(req, res) => {
       // Execute query 
    const cursor = craftCollection.find();
    const result = await cursor.toArray();
    res.send(result)
    })


    // filter single my cart data by email
    app.get("/myArtAndCraft/:email", async (req, res) => {
      // console.log(req.params.email)
      const result = await craftCollection
        .find({ email: req.params.email })
        .toArray();
      res.send(result);
    });


    // single item find operation
    app.get("/singleCraft/:id", async (req, res) => {
      // console.log(req.params.id)
      const result = await craftCollection.findOne({
        _id: new ObjectId(req.params.id),
      });
      console.group(result);
      res.send(result)
    });

    // single item find operation for view details
    app.get("/allCraftViewDetails/:id", async (req, res) => {
      // console.log(req.params.id)
      const result = await craftCollection.findOne({
        _id: new ObjectId(req.params.id),
      });
      console.group(result);
      res.send(result)
    });

    // update
    app.put("/updateCraft/:id", async (req, res) => {
      console.log(req.params.id);
      const query = { _id: new ObjectId(req.params.id) };
      const data = {
        $set: {
          image: req.body.image,
          itemName: req.body.itemName,
          subcategoryName: req.body.subcategoryName,
          shortDescription: req.body.shortDescription,
          price: req.body.price,
          rating: req.body.rating,
          customization: req.body.customization,
          processingTime: req.body.processingTime,
          stockStatus: req.body.stockStatus,
        },
      };
      const result = await craftCollection.updateOne(query, data);
      console.log(result);
      res.send(result);
    });


    // delete operation
    app.delete("/delete/:id", async(req, res) => {
        const result = await craftCollection.deleteOne({
            _id: new ObjectId(req.params.id)
        })
        console.log(result);
        res.send(result)

    })



    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);
// mongodb code end

app.get("/", (req, res) => {
  res.send("Craft server is running");
});

app.listen(port, () => {
  console.log(`Craft Server is running on port ${port}`);
});
