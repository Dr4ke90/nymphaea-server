const connectDB = require("../db");

const getAllNecesar = async (req, res) => {
  try {
    const db = await connectDB();
    const collection = db.collection("necesar_it");

    const necesar = await collection.find({}).toArray();
    res.json(necesar);
  } catch (error) {
    console.error("Eroare la preluarea fiselor necear:", error);
    res.status(500).json({ error: "Eroare la preluarea fiselor" });
  }
};

const getOneFileNecesar = async (req, res) => {
  const { fisa } = req.params;

  try {
    const db = await connectDB();
    const collection = db.collection("necesar_it");

    const response = await collection.findOne({ fisa });

    if (!response) {
      return res.status(404).json({ error: "Fisa nu a fost găsita." });
    }

    return res.json({ response: response });
  } catch (error) {
    console.error("Eroare la preluarea fisei : " + fisa, error);
    res.status(500).json({ error: "Eroare la preluarea fisei" });
  }
};

const postNecesarFile = async (req, res) => {
  const fisaNoua = req.body;
  try {
    const db = await connectDB();
    const collection = db.collection("necesar_it");

    const response = await collection.insertOne(fisaNoua);
    console.log(response);
  } catch (error) {
    console.error("Eroare la adăugarea fisei : " + fisaNoua.fisa, error);
    res.status(500).json({ error: "Eroare la adăugarea facturii" });
  }
};

const updateNecesarFile = async (req, res) => {
  const { fisa } = req.params;
  const updates = req.body;

  try {
    const db = await connectDB();
    const collection = db.collection("necesar_it");

    const response = await collection.updateOne(
      { fisa: fisa.toString() },
      { $set: updates }
    );

    if (response.matchedCount === 0) {
      return res
        .status(404)
        .json({ error: "Fisa nu a fost găsita.", response: response });
    }

    if (response.modifiedCount !== 0) {
      return res.status(200).json({
        message: `Fisa cu nr ${fisa} a fost actualizata cu succes.`,
        response: response,
      });
    }
  } catch (error) {
    console.error("Eroare la actualizarea fisei:", error);
    res.status(500).json({ error: "Eroare la actualizarea fisei" });
  }
};

const deleteNecesarFile = async (req, res) => {
  const { fisa } = req.params;

  try {
    const db = await connectDB();
    const collection = db.collection("necesar_it");

    const response = await collection.deleteOne({ fisa: fisa });

    if (response.matchedCount === 0) {
      return res
        .status(404)
        .json({ error: `Fisa cu nr ${fisa} nu a fost găsita.` });
    }

    res.status(200).json({
      message: `Fisa cu nr ${fisa} a fost stearsa cu succes.`,
      response: response,
    });
  } catch (error) {
    console.error("Eroare la preluarea proceselor verbale:", error);
    res.status(500).json({ error: "Eroare la preluarea proceselor verbale" });
  }
};

module.exports = {
  getAllNecesar,
  getOneFileNecesar,
  postNecesarFile,
  updateNecesarFile,
  deleteNecesarFile,
};
