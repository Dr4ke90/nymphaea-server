const { ObjectId } = require("mongodb");
const connectDB = require("../db");

const getAllAppointments = async (req, res) => {
  try {
    const db = await connectDB();
    const collection = db.collection("programari");

    const appointemnts = await collection.find({}).toArray();
    res.json(appointemnts);
  } catch (error) {
    console.error("Eroare la incarcarea programarilor:", error);
    res.status(500).json({ error: "Eroare la incarcarea programarilor" });
  }
};

const getOneAppointment = async (req, res) => {
  const { cod } = req.params;
  try {
    const db = await connectDB();
    const collection = db.collection("programari");

    const response = await collection.findOne(
      { cod: cod },
      { returnDocument: "after" }
    );

    if (!response) {
      return res
        .status(200)
        .json({ error: `Programarea ${cod} nu a fost găsita.`, response: {} });
    }

    return res
      .status(200)
      .json({
        message: `Programarea ${cod} a fost preluata cu succes`,
        response: response,
      });
  } catch (error) {
    console.error("Eroare la preluarea programarii " + nr, error);
    res.status(500).json({ error: "Eroare la preluarea programarii " + nr });
  }
};

const postOneAppointment = async (req, res) => {
  const appointement = req.body;
  try {
    const db = await connectDB();
    const collection = db.collection("programari");

    const response = await collection.insertOne(appointement);

    if (!response.acknowledged) {
      return res.status(404).json({
        message: `Progamarea ${appointement.nr} nu a putut fi adaugata.`,
      });
    }

    return res.status(200).json({
      message: `Programarea ${appointement.nr} a fost adaugata cu succes`,
    });
  } catch (error) {
    res.status(500).json({ error: "Eroare la adăugarea Programarii " });
  }
};

const updateOneAppointment = async (req, res) => {
  const { cod } = req.params;
  const appointement = req.body;

  try {
    const db = await connectDB();

    const collection = db.collection("programari");

    const response = await collection.updateOne(
      { cod: cod },
      { $set: appointement }
    );

    if (response.matchedCount === 0) {
      return res.status(200).json({
        message: `Programarea ${cod} nu a fost gasita!`,
        response: {},
      });
    }

    if (response.modifiedCount !== 0) {
      return res.status(200).json({
        message: `Programarea ${cod} a fost actualizata cu succes.`,
        response: appointement,
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Eroare la actualizarea Programarii " + cod, error });
  }
};

const deleteOneAppointment = async (req, res) => {
  const { nr } = req.params;
  try {
    const db = await connectDB();
    const collection = db.collection("programari");

    const response = await collection.deleteOne({ nr: nr });

    if (response.matchedCount === 0) {
      return res
        .status(404)
        .json({ message: `Programarea ${nr} nu a fost găsita.` });
    }

    res.json({
      message: `Programarea ${nr} a fost stearsa cu succes.`,
    });
  } catch (error) {
    console.error("Eroare la stergerea Programarii " + nr, error);
    res.status(500).json({ error: "Eroare la stergerea Programarii " + nr });
  }
};

module.exports = {
  getAllAppointments,
  getOneAppointment,
  postOneAppointment,
  updateOneAppointment,
  deleteOneAppointment,
};
