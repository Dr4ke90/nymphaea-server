const connectDB = require("../db");

const getAllServices = async (req, res) => {
  try {
    const db = await connectDB();
    const collection = db.collection("servicii");

    const necesar = await collection.find({}).toArray();
    res.json(necesar);
  } catch (error) {
    console.error("Eroare la preluarea listei de Servicii:", error);
    res.status(500).json({ error: "Eroare la preluarea listei de Servicii" });
  }
};

const getOneService = async (req, res) => {
  const { cod } = req.params;

  try {
    const db = await connectDB();
    const collection = db.collection("servicii");

    const response = await collection.findOne({ cod: cod });

    if (!response) {
      return res
        .status(200)
        .json({ error: "Serviciul nu a fost găsit.", response: {} });
    }

    return res.status(200).json({ response: response });
  } catch (error) {
    console.error("Eroare la preluarea serviciului : " + cod, error);
    res.status(500).json({ error: "Eroare la preluarea serviciului " + cod });
  }
};

const postServiciu = async (req, res) => {
  const serviciu = req.body;

  try {
    const db = await connectDB();
    const collection = db.collection("servicii");

    const response = await collection.insertOne(serviciu);

    if (!response.acknowledged) {
      return res
        .status(404)
        .json({ error: `Serviciu ${serviciu.cod} nu a putut fi adaugat.` });
    }

    return res.status(200).json({
      success: `Serviciul ${serviciu.cod} a fost adaugat cu succes`,
    });
  } catch (error) {
    console.error("Eroare la adăugarea Serviciului " + serviciu.cod, error);
    res
      .status(500)
      .json({ error: "Eroare la adăugarea Serviciului " + serviciu.cod });
  }
};

const updateServiciu = async (req, res) => {
  const { cod } = req.params;
  const updates = req.body;
  delete updates._id;

  try {
    const db = await connectDB();
    const collection = db.collection("servicii");

    const response = await collection.updateOne(
      { cod: cod },
      { $set: updates }
    );

    if (response.matchedCount === 0) {
      return res.status(404).json({ error: "Serviciul nu a fost găsit." });
    }

    if (response.modifiedCount >= 1) {
      return res.status(200).json({
        success: `Serviciul ${cod} a fost actualizat cu succes.`
      });
    }
  } catch (error) {
    console.error("Eroare la actualizarea Serviciului " + cod, error);
    res
      .status(500)
      .json({ error: "Eroare la actualizarea serviciului " + cod });
  }
};

const deleteServiciu = async (req, res) => {
  const { cod } = req.params;

  try {
    const db = await connectDB();
    const collection = db.collection("servicii");

    const response = await collection.deleteOne({ cod: cod });

    if (!response) {
      return res
        .status(404)
        .json({ error: `Serviciul ${cod} nu a fost găsit.` });
    }

    return res.status(200).json({
      success: `Serviciul ${cod} a fost sters cu succes.`,
    });
  } catch (error) {
    console.error("Eroare la stergerea Serviciului " + cod, error);
    res.status(500).json({ error: "Eroare la stergerea Serviciului" + cod });
  }
};

module.exports = {
  getAllServices,
  getOneService,
  postServiciu,
  updateServiciu,
  deleteServiciu,
};
