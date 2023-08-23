const { MongoClient } = require("mongodb");

const mongoURI = "mongodb://localhost:27017";
const dbName = "Coral";

const getAllpredare = async (req, res) => {
  try {
    const client = new MongoClient(mongoURI);
    await client.connect();

    const db = client.db(dbName);
    const collection = db.collection("predare_it");

    const response = await collection.find({}).toArray();

    if (!response) {
      return res
        .status(404)
        .json({ error: "Fisele de predare nu au putut fi preluate!!" });
    }

    return res.status(200).json({
      succes: "Fisele de predare au fost preluate cu succes!!",
      response: response,
    });
  } catch (error) {
    res.status(500).json({ error: "Eroare la preluarea fiselor de Predare" });
  }
};

const getOnePredareFile = async (req, res) => {
  const { pv } = req.params;
  try {
    const client = new MongoClient(mongoURI);
    await client.connect();

    const db = client.db(dbName);
    const collection = db.collection("predare_it");

    const response = await collection.findOne({ pv });

    if (!response) {
      return res.status(404).json("Fisa nu a fost găsita.");
    }

    return res.status(200).json({
      response: response,
      succes: `Fisa cu nr ${pv} a fost preluata cu succes`,
    });
  } catch (error) {
    res.status(500).json("Eroare la preluarea fisei " + pv);
  }
};

const postOnePredareFile = async (req, res) => {
  const fisaNoua = req.body;

  try {
    const client = new MongoClient(mongoURI);
    await client.connect();

    const db = client.db(dbName);
    const collection = db.collection("predare_it");

    const response = await collection.insertOne(fisaNoua);

    if (!response.acknowledged) {
      return res.status(404).json({ error: "Fisa nu a putut fi adaugata." });
    }

    return res
      .status(200)
      .json({ succes: `Fisa cu nr ${fisaNoua.pv} a fost adaugata cu succes` });
  } catch (error) {
    res.status(500).json({ error: "Eroare la adăugarea fisei" + fisaNoua.pv });
  }
};

const updateOnePredareFile = async (req, res) => {
  const { pv } = req.params;
  const data = req.body;

  try {
    const client = new MongoClient(mongoURI);
    await client.connect();

    const db = client.db(dbName);
    const collection = db.collection("predare_it");

    const response = await collection.updateOne({ pv: pv }, { $set: data });

    if (response.matchedCount === 0) {
      return res
        .status(404)
        .json({ error: `Fisa cu nr ${pv} nu a fost găsita.` });
    }

    if (response.modifiedCount !== 0) {
      return res
        .status(200)
        .json({ succes: `Fisa cu nr ${pv} a fost actualizata cu succes.` });
    }
  } catch (error) {
    res.status(500).json("Eroare la actualizarea fisei " + pv);
  }
};

const deleteOnePredareFile = async (req, res) => {
  const { pv } = req.params;
  try {
    const client = new MongoClient(mongoURI);
    await client.connect();

    const db = client.db(dbName);
    const collection = db.collection("predare_it");

    const response = await collection.deleteOne({ pv: pv });

    if (!response) {
      return res
        .status(404)
        .json({ error: `Fisa cu nr ${pv} nu a fost găsita.` });
    }

    return res.status(200).json({
      succes: `Fisa cu nr ${pv} a fost stearsa cu succes.`,
    });
  } catch (error) {
    res.status(500).json({ error: "Eroare la stergerea fisei " + pv });
  }
};

module.exports = {
  getAllpredare,
  getOnePredareFile,
  postOnePredareFile,
  updateOnePredareFile,
  deleteOnePredareFile,
};
