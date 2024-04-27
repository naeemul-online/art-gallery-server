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
    // Connect to the "insertDB" database and access its "haiku" collection
    const artCollection = client.db("artGalleryDB").collection("artGallery");

    // API Created to insert data to the database
    app.post("/artGallery", async (req, res) => {
      const newArtGallery = req.body;
      console.log(newArtGallery)
      const result = await artCollection.insertOne(newArtGallery);
      res.send(result);
    });


    // read data
    app.get("/artGallery", async (req, res) => {
        // Execute query
        const cursor = artCollection.find();
        const result = await cursor.toArray();
        res.send(result);
      });

    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

    // Connect to the "insertDB" database and access its "haiku" collection
    // const coffeeCollection = client.db("coffeeDB").collection("coffee");
    // const userCollection = client.db('coffeeDB').collection('user')

    // created api to receive data from client
    // app.post("/coffee", async (req, res) => {
    //   const newCoffee = req.body;
    //   console.log(newCoffee);
    //   const result = await coffeeCollection.insertOne(newCoffee);
    //   res.send(result);
    // });

    // edit data
    // app.get("/coffee/:id", async (req, res) => {
    //   const id = req.params.id;
    //   const query = { _id: new ObjectId(id) };
    //   const result = await coffeeCollection.findOne(query);
    //   res.send(result);
    // });

    // read data
    // app.get("/coffee", async (req, res) => {
    //   // Execute query
    //   const cursor = coffeeCollection.find();
    //   const result = await cursor.toArray();
    //   res.send(result);
    // });

    // update data
    // app.put("/coffee/:id", async (req, res) => {
    //   const id = req.params.id;
    //   const filter = { _id: new ObjectId(id) };
    //   const options = { upsert: true };
    //   const updateCoffee = req.body;
    //   const coffee = {
    //     $set: {
    //       name: updateCoffee.name,
    //       quantity: updateCoffee.quantity,
    //       supplier: updateCoffee.supplier,
    //       taste: updateCoffee.taste,
    //       category: updateCoffee.category,
    //       details: updateCoffee.details,
    //       photo: updateCoffee.photo,
    //     },
    //   };

    //   const result = await coffeeCollection.updateOne(filter, coffee, options);
    //   res.send(result)
    // });

    // delete data
    // app.delete("/coffee/:id", async (req, res) => {
    //   const id = req.params.id;
    //   const query = { _id: new ObjectId(id) };
    //   const result = await coffeeCollection.deleteOne(query);
    //   res.send(result);
    // });

    // Users related APIs

    // read data
    // app.get("/user", async (req, res) => {
    //   // Execute query
    //   const cursor = userCollection.find();
    //   const result = await cursor.toArray();
    //   res.send(result);
    // });

    // send data to database
    //  app.post("/user", async (req, res) => {
    //   const newUser = req.body;
    //   console.log(newUser);
    //   const result = await userCollection.insertOne(newUser);
    //   res.send(result);
    // });

    // delete data
    //   app.delete("/user/:id", async (req, res) => {
    //     const id = req.params.id;
    //     const query = { _id: new ObjectId(id) };
    //     const result = await userCollection.deleteOne(query);
    //     res.send(result);
    //   });

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
  res.send("Art gallery server is running");
});

app.listen(port, () => {
  console.log(`Art gallery Server is running on port ${port}`);
});
