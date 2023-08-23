const { MongoClient, ObjectId } = require("mongodb");

const mongoURI = "mongodb://localhost:27017";
const dbName = "Coral";

const getAllInvoices = async (req, res) => {
  try {
    const client = new MongoClient(mongoURI);
    await client.connect();

    const db = client.db(dbName);
    const collection = db.collection("facturi_it"); 

    const facturi = await collection.find({}).toArray();
    res.json(facturi);
  } catch (error) {
    console.error("Eroare la preluarea facturilor:", error);
    res.status(500).json({ error: "Eroare la preluarea facturilor" });
  }
};

const postOneInvoice = async (req, res) => {
  try {
    const client = new MongoClient(mongoURI);
    await client.connect();

    const db = client.db(dbName);
    const collection = db.collection("facturi_it");

    const facturaData = req.body;

    await collection.insertOne(facturaData);
  } catch (error) {
    console.error("Eroare la adăugarea facturii:", error);
    res.status(500).json({ error: "Eroare la adăugarea facturii" });
  }
};

const deleteOneInvoice = async (req, res) => {
  const { id } = req.params;
  try {
    const client = new MongoClient(mongoURI);
    await client.connect();

    const db = client.db(dbName);
    const collection = db.collection("facturi_it");

    const response = await collection.deleteOne({ _id: new ObjectId(id) });

    if (!response) {
      return res
        .status(404)
        .json({ error: `Factura cu id ${id} nu a fost găsita.` });
    }

    return res.status(200).json({
      success: `Factura cu id ${id} a fost stearsa cu succes.`,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Eroare la stergerea farturii " + id });
  }
};

const getOneInvoice = async (req, res) => {
  const { id } = req.params;

  try {
    const client = new MongoClient(mongoURI);
    await client.connect();

    const db = client.db(dbName);
    const collection = db.collection("facturi_it");

    const response = await collection.findOne({ _id: new ObjectId(id) });

    if (!response) {
      return res.status(404).json({error: "Factura nu a fost găsita."});
    }

    return res.json(response);
  } catch (error) {
    console.error("Eroare la preluarea facturii:", error);
    return res.status(500).json({ error: "Eroare la preluarea facturii" });
  }
};

const updateOneInvoice = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  delete updates._id

  try {
    const client = new MongoClient(mongoURI);
    await client.connect();

    const db = client.db(dbName);
    const collection = db.collection("facturi_it");

    const response = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updates }
    );

    if (response.matchedCount === 0) {
      return res
        .status(404)
        .json({ error: "Factura nu a fost găsita.", response: response });
    }

    if (response.modifiedCount !== 0) {
      return res.status(200).json({
        success: `Factura cu id ${id} a fost actualizata cu succes.`,
        response: response,
      });
    }
  } catch (error) {
    console.error("Eroare la actualizarea fisei:", error);
    return res.status(500).json({ error: "Eroare la actualizarea fisei" });
  }
};

module.exports = {
  getAllInvoices,
  postOneInvoice,
  deleteOneInvoice,
  getOneInvoice,
  updateOneInvoice,
};
