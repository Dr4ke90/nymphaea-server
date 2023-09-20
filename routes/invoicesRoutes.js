const { ObjectId } = require("mongodb");
const connectDB = require("../db");

const getAllInvoices = async (req, res) => {
  try {
    const db = await connectDB();

    const collection = db.collection("facturi");

    const facturi = await collection.find({}).toArray();
    res.json(facturi);
  } catch (error) {
    console.error("Eroare la preluarea facturilor:", error);
    res.status(500).json({ error: "Eroare la preluarea facturilor" });
  }
};

const postOneInvoice = async (req, res) => {
  const factura = req.body;
  try {
    const db = await connectDB();
    const collection = db.collection("facturi");

    const response = await collection.insertOne(factura);


    if (!response.acknowledged) {
      return res.status(200).json({
        message: `Factura ${factura.cod} nu a putut fi adaugata.`,
        response: {}
      });
    }

    return res.status(200).json({
      message: `Factura ${factura.cod} a fost adaugata cu succes`,
      response: factura
    });
  } catch (error) {
    console.error("Eroare la adăugarea facturii:", error);
    res.status(500).json({ error: "Eroare la adăugarea facturii" });
  }
};

const deleteOneInvoice = async (req, res) => {
  const { nr } = req.params;
  try {
    const db = await connectDB();
    const collection = db.collection("facturi");

    const response = await collection.deleteOne({ nr: nr });

    if (!response) {
      return res
        .status(404)
        .json({ message: `Factura cu nr ${nr} nu a fost găsita.` });
    }

    return res.status(200).json({
      message: `Factura cu nr ${nr} a fost stearsa cu succes.`,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Eroare la stergerea farturii " + nr });
  }
};

const getOneInvoice = async (req, res) => {
  const { nr } = req.params;

  try {
    const db = await connectDB();
    const collection = db.collection("facturi");

    const response = await collection.findOne({ nr: nr });

    if (!response) {
      return res
        .status(200)
        .json({
          message: `Factura ${nr} nu exista in baza de date`,
          response: {},
        });
    }

    return res.status(200).json({
      message: `Factura ${nr} a fost preluata cu succes`,
      response: response,
    });
  } catch (error) {
    console.error("Eroare la preluarea facturii" + nr, error);
    return res.status(500).json({ error: "Eroare la preluarea facturii" });
  }
};

const updateOneInvoice = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  delete updates._id;

  try {
    const db = await connectDB();
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
