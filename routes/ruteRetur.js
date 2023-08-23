const { MongoClient } = require("mongodb");

const mongoURI = "mongodb://localhost:27017";
const dbName = "Coral";

const getAllRetur = async (req, res) => {
  try {
    const client = new MongoClient(mongoURI);
    await client.connect();

    const db = client.db(dbName);
    const collection = db.collection("retur_it");

    const retur = await collection.find({}).toArray();
    res.json(retur);
  } catch (error) {
    console.error("Eroare la preluarea facturilor:", error);
    res.status(500).json({ error: "Eroare la preluarea facturilor" });
  }
};

const getOneReturFile = async (req, res) => {
  const { pv } = req.params;
  try {
    const client = new MongoClient(mongoURI);
    await client.connect();

    const db = client.db(dbName);
    const collection = db.collection("retur_it");

    const response = await collection.findOne({ pv });
    if (!response) {
      return res.status(404).json({ error: "Fisa nu a fost găsita." });
    }

    res.json(response);
  } catch (error) {
    console.error("Eroare la preluarea fisei: " + pv, error);
    res.status(500).json({ error: "Eroare la preluarea fisei" });
  }
};

const postOneReturFile = async (req, res) => {
  try {
    const client = new MongoClient(mongoURI);
    await client.connect();

    const db = client.db(dbName);
    const collection = db.collection("retur_it");

    const retur = req.body;
    const response = await collection.insertOne(retur);
    if (!response.acknowledged) {
      return res.status(404).json({ error: "Fisa nu a putut fi adaugata." });
    }

    return res
      .status(200)
      .json({ succes: `Fisa cu nr ${fisaNoua.pv} a fost adaugata cu succes` });
  } catch (error) {
    res.status(500).json({ error: "Eroare la adăugarea facturii "});
  }
};

const updateOneReturFile = async (req, res) => {
  const { pv } = req.params;
  const updates = req.body;

  try {
    const client = new MongoClient(mongoURI);
    await client.connect()

    const db = client.db(dbName);

    const collection = db.collection("retur_it");

    const response = await collection.updateOne({ pv: pv }, { $set: updates });

    if (response.matchedCount === 0) {
      return res.status(404).json({
        message: `Fisa cu nr ${px} nu a fost gasita!`,
        response: response,
      });
    }

    if (response.modifiedCount !== 0) {
      return res.status(200).json({
        message: `Fisa cu nr ${pv} a fost actualizata cu succes!!`,
        response: response,
      });
    }

    res.json(response)
  } catch (error) {
    res
      .status(500)
      .json({ message: "Eroare la actualizarea fisei " + pv, error: error });
  }
};


const deleteOneReturFile =  async (req, res) => {
  const { pv } = req.params;

  console.log(pv)
  try {
    const client = new MongoClient(mongoURI);
    await client.connect();

    const db = client.db(dbName);
    const collection = db.collection("retur_it");

    const response = await collection.deleteOne({ pv: pv });

    if (response.matchedCount === 0) {
      return res
        .status(404)
        .json({ error: `Fisa cu nr ${pv} nu a fost găsita.` });
    }

    res.json({
      message: `Fisa cu nr ${pv} a fost stearsa cu succes.`,
      response: response,
    });
  } catch (error) {
    console.error("Eroare la stergerea proceselor verbale:", error);
    res.status(500).json({ error: "Eroare la stergerea proceselor verbale" });
  }
}

module.exports = {
  getAllRetur,
  postOneReturFile,
  updateOneReturFile,
  getOneReturFile,
  deleteOneReturFile
};
