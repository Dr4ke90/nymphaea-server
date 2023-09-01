const connectDB = require("../db");

const getAllEmployees = async (req, res) => {
  try {
    const db = await connectDB();
    const collection = db.collection("angajati");

    const echipament = await collection.find({}).toArray();

    res.json(echipament);
  } catch (error) {
    console.error("Eroare la preluarea listei de Angajati:", error);
    res
      .status(500)
      .json({ error: "Eroare la preluarea listei de Angajati" });
  }
};

const postOneEchipoamentFile = async (req, res) => {
  const echipament = req.body;

  try {
    const db = await connectDB();
    const collection = db.collection("echipament_it");

    const response = await collection.insertOne(echipament);

    if (!response.acknowledged) {
      return res.status(404).json({ error: "Fisa nu a putut fi adaugata." });
    }

    return res.status(200).json({
      success: `Echipamentul cu nr ${echipament.cit} a fost adaugat cu succes`,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Eroare la adăugarea echipamentului" + echipament.cit });
  }
};

const getOneEchipamentFile = async (req, res) => {
  const { cit } = req.params;

  try {
    const db = await connectDB();
    const collection = db.collection("echipament_it");

    const response = await collection.findOne(
      { cit: cit },
      { returnDocument: "after" }
    );

    if (response === null) {
      return res.status(404).json({ error: "Echipamentul nu a fost găsit." });
    }

    return res.status(200).json({ response: response });
  } catch (error) {
    console.error("Eroare la preluarea echipamentului:", error);
    return res
      .status(500)
      .json({ error: "Eroare la preluarea echipamentului" });
  }
};

const updateEchipamentFile = async (req, res) => {
  const { cit } = req.params;
  const updates = req.body;

  try {
    const db = await connectDB();
    const collection = db.collection("echipament_it");

    const response = await collection.updateOne(
      { cit: cit },
      { $set: updates }
    );

    if (response.matchedCount === 0) {
      return res.status(404).json({ error: "Echipamentul nu a fost găsit." });
    }

    if (response.modifiedCount >= 1) {
      res.json({
        success: `Echipamentul cu cit ${cit} a fost actualizat cu succes.`,
      });
    }
  } catch (error) {
    console.error("Eroare la actualizarea echipamentului:", error);
    res.status(500).json({ error: "Eroare la actualizarea echipamentului" });
  }
};

module.exports = {
  getAllEmployees,
  getOneEchipamentFile,
  updateEchipamentFile,
  postOneEchipoamentFile,
};