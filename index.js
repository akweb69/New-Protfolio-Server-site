const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const app = express();
const port = process.env.PORT || 5000;

// -----------------
// Middleware
app.use(cors());
app.use(express.json());

// -----------------
// MongoDB connection URI
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.oaguo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// MongoDB Client Setup
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// -----------------
// Database & Collection references
let ResumeCollection;
let ProjectsCollection;
let ContactCollection;
let GelleryCollection;
let CertificatesCollection;
let AchievmentCollection;

// -----------------
// Run MongoDB connection
async function run() {
  try {
    await client.connect();

    const db = client.db("MyProtfolio");

    ResumeCollection = db.collection("resume");
    ProjectsCollection = db.collection("projects");
    ContactCollection = db.collection("contacts");
    GelleryCollection = db.collection("galleries");
    CertificatesCollection = db.collection("certificates");
    AchievmentCollection = db.collection("achievements");

    console.log("✅ Successfully connected to MongoDB!");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
}
run();
// ------
// main api section starts here --->
// contact rout API----> starts---->
// contact information er post rout Api---->
app.post("/add_contact_info", async (req, res) => {
  const data = req.body;
  const result = await ContactCollection.insertOne(data);
  res.send(result);
});
// contact information er get api ------>
app.get("/contact_info_get", async (req, res) => {
  4;
  const result = await ContactCollection.find().sort({ _id: -1 }).toArray();
  res.send(result);
});
// contact information update patch api---->
app.patch("/update_contact_information/:id", async (req, res) => {
  const id = req.params.id;
  const mainContactData = req.body;
  const query = { _id: new ObjectId(id) };
  const updateDoc = {
    $set: { ...mainContactData },
  };
  const result = await ContactCollection.updateOne(query, updateDoc);
  res.send(result);
});
// contact rout API----> ends---->
// Projects rout API----> Starts---->
// get all projects api--->
app.get("/all_projects", async (req, res) => {
  const result = await ProjectsCollection.find().sort({ _id: -1 }).toArray();
  res.send(result);
});
// post a project api--->
app.post("/single_project", async (req, res) => {
  const data = req.body;
  const result = await ProjectsCollection.insertOne(data);
  res.send(result);
});
// update project api--->
app.patch("/update_project_data/:id", async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  const query = { _id: new ObjectId(id) };
  const updatedDoc = {
    $set: { ...data },
  };
  const result = await ProjectsCollection.updateOne(query, updatedDoc);
  res.send(result);
});
// deleted projects api--->
app.delete("/delete_project/:id", async (req, res) => {
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const result = await ProjectsCollection.deleteOne(query);
  res.send(result);
});
// Projects rout API----> Ends---->
// Gellery Api----> starts---->
// all gellery get api--->
app.get("/all_images", async (req, res) => {
  const result = await GelleryCollection.find().sort({ _id: -1 }).toArray();
  res.send(result);
});
// post and upadted gellery images- form here
app.patch("/add_gellery_images", async (req, res) => {
  const newImages = req.body; // এটা array বা single object হতে পারে
  const filter = { _id: new ObjectId("6894b5a014332f8ebfe21008") };
  const updateDoc = {
    $push: {
      images: { $each: newImages },
    },
  };
  const result = await GelleryCollection.updateOne(filter, updateDoc);
  res.send(result);
});

// Gellery Api----> ends---->
// all certificates get api--->
app.get("/all_certificates", async (req, res) => {
  const result = await CertificatesCollection.find()
    .sort({ _id: -1 })
    .toArray();
  res.send(result);
});
// certificates Api----> ends---->

// main api section ends here --->
// -----------------
// Sample route
app.get("/", (req, res) => {
  res.send("✅ The server is running --- Abu Kalam --- Alhamdulillah!");
});

// -----------------
// Start server
app.listen(port, () => {
  console.log(
    `🚀 Server is running on port ${port} --- Abu Kalam --- Alhamdulillah!`
  );
});
