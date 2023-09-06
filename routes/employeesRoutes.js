const connectDB = require("../db");

const getAllEmployees = async (req, res) => {
  try {
    const db = await connectDB();
    const collection = db.collection("angajati");

    const employees = await collection.find({}).toArray();

    res.json(employees);
  } catch (error) {
    console.error("Eroare la preluarea listei de Angajati:", error);
    res.status(500).json({ error: "Eroare la preluarea listei de Angajati" });
  }
};

const postOneEmployee = async (req, res) => {
  const employee = req.body;

  try {
    const db = await connectDB();
    const collection = db.collection("angajati");

    const response = await collection.insertOne(employee);

    if (!response.acknowledged) {
      return res
        .status(404)
        .json({ error: `Angajatul ${employee.cod} nu a putut fi adaugat.` });
    }

    return res.status(200).json({
      success: `Angajatul cu nr ${employee.cod} a fost adaugat cu succes`,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Eroare la adăugarea Angajatului" + employee.cod });
  }
};

const getOneEmployee = async (req, res) => {
  const { cod } = req.params;

  try {
    const db = await connectDB();
    const collection = db.collection("angajati");

    const response = await collection.findOne(
      { cod: cod },
      { returnDocument: "after" }
    );

    if (response === null) {
      return res.status(200).json({
        message: `Angajatul ${cod} nu exista in baza de date`,
        response: {},
      });
    }

    return res.status(200).json({
      message: `Angajatul ${cod} a fost preluat cu succes`,
      response: response,
    });
  } catch (error) {
    console.error(`Eroare la preluarea angajatului ${cod}`, error);
    return res
      .status(500)
      .json({ error: `Eroare la preluarea Angajatului ${cod}` });
  }
};

const updateOneEmployee = async (req, res) => {
  const { cod } = req.params;
  const updates = req.body;
  delete updates._id;

  try {
    const db = await connectDB();
    const collection = db.collection("angajati");

    const response = await collection.updateOne(
      { cod: cod },
      { $set: updates }
    );

    if (response.matchedCount === 0) {
      return res.status(200).json({
        message: `Angajatul ${cod} nu a fost gasit`,
        response: response.matchedCount,
      });
    }

    if (response.modifiedCount >= 1) {
      res.json({
        message: `Angajatul cu codul ${cod} a fost actualizat cu succes.`,
        response: response.modifiedCount,
      });
    }
  } catch (error) {
    console.error("Eroare la actualizarea Angajatului " + cod, error);
    res
      .status(500)
      .json({ error: "Eroare la actualizarea angajatului " + cod });
  }
};

const deleteOneEmployee = async (req, res) => {
  const { cod } = req.params;
  try {
    const db = await connectDB();
    const collection = db.collection("angajati");

    const response = await collection.deleteOne({ cod: cod });

    if (!response) {
      return res
        .status(404)
        .json({ error: `Angajatul ${cod} nu a fost găsit.` });
    }

    return res.status(200).json({
      success: `Angajatul ${cod} a fost sters cu succes.`,
    });
  } catch (error) {
    res.status(500).json({ error: "Eroare la stergerea angajatului " + cod });
  }
};

module.exports = {
  getAllEmployees,
  getOneEmployee,
  updateOneEmployee,
  postOneEmployee,
  deleteOneEmployee,
};
