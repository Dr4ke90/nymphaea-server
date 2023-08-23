const { MongoClient, ObjectId } = require("mongodb");

const mongoURI = "mongodb://localhost:27017";
const dbName = "Coral";

const getAllUsers = async (req, res) => {
    try {
      const client = new MongoClient(mongoURI);
      await client.connect();
  
      const db = client.db(dbName);
      const collection = db.collection("users");
  
      const retur = await collection.find({}).toArray();
      res.json(retur);
    } catch (error) {
      console.error("Eroare la preluarea utilizatorilor:", error);
      res.status(500).json({ error: "Eroare la preluarea utilizatorilor" });
    }
  };


  const getOneUser = async (req, res) => {
    const {email} = req.params;

    try {
      const client = new MongoClient(mongoURI);
      await client.connect();
  
      const db = client.db(dbName);
      const collection = db.collection("users");
  
      const retur = await collection.findOne({email: email})
      res.json(retur);
    } catch (error) {
      console.error("Eroare la preluarea utilizatorilor:", error);
      res.status(500).json({ error: "Eroare la preluarea utilizatorilor" });
    }
  };


  module.exports = {
    getAllUsers,
    getOneUser
  }