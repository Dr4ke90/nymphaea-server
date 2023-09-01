const connectDB = require("../db");

const getAllUsers = async (req, res) => {
  try {
    const db = await connectDB();
    const collection = db.collection("users");

    const retur = await collection.find({}).toArray();
    res.json(retur);
  } catch (error) {
    console.error("Eroare la preluarea utilizatorilor:", error);
    res.status(500).json({ error: "Eroare la preluarea utilizatorilor" });
  }
};

const getOneUser = async (req, res) => {
  const { email } = req.params;

  try {
    const db = await connectDB();
    const collection = db.collection("users");

    const retur = await collection.findOne({ email: email });
    res.json(retur);
  } catch (error) {
    console.error("Eroare la preluarea utilizatorilor:", error);
    res.status(500).json({ error: "Eroare la preluarea utilizatorilor" });
  }
};

module.exports = {
  getAllUsers,
  getOneUser,
};
