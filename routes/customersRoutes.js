const connectDB = require("../db");

const getAllCustomers = async (req, res) => {
  try {
    const db = await connectDB();
    const collection = db.collection("clienti");

    const customers = await collection.find({}).toArray();

    res.json(customers);
  } catch (error) {
    console.error("Eroare la preluarea listei de Angajati:", error);
    res.status(500).json({ error: "Eroare la preluarea listei de Angajati" });
  }
};

const getOneCustomer = async (req, res) => {
  const { cod } = req.params;
  try {
    const db = await connectDB();
    const collection = db.collection("clienti");

    const response = await collection.findOne(
      { cod: cod },
      { returnDocument: "after" }
    );

    if (response === null) {
      return res
        .status(200)
        .json({ message: `Clientul ${cod} nu a fost gasit`, response: {} });
    }

    return res.status(200).json({
      response: response,
      success: `Clientul ${cod} a fost preluat cu succes`,
    });
  } catch (error) {
    res.status(500).json("Eroare la preluarea Clientului " + cod);
  }
};

const postOneCustomer = async (req, res) => {
  const customer = req.body;

  try {
    const db = await connectDB();
    const collection = db.collection("clienti");

    const response = await collection.insertOne(customer);

    if (!response.acknowledged) {
      return res
        .status(404)
        .json({ error: `Clientul ${customer.cod} nu a fost gasit` });
    }

    return res
      .status(200)
      .json({ success: `Clientul ${customer.cod} a fost adaugat cu succes` });
  } catch (error) {
    res
      .status(500)
      .json({ error: `Eroare la adaugarea Clientului ${customer.cod}` });
  }
};

const updateOneCustomer = async (req, res) => {
  const { cod } = req.params;
  const data = req.body;

  try {
    const db = await connectDB();
    const collection = db.collection("clienti");

    const response = await collection.updateOne({ cod: cod }, { $set: data });

    if (response.matchedCount === 0) {
      return res
        .status(404)
        .json({ error: `Clientul  ${cod} nu a fost găsit.` });
    }

    if (response.modifiedCount !== 0) {
      return res
        .status(200)
        .json({ success: `Clientul ${cod} a fost actualizata cu succes.` });
    }
  } catch (error) {
    res.status(500).json("Eroare la actualizarea fisei " + pv);
  }
};

const deleteOneCustomer = async (req, res) => {
  const { cod } = req.params;
  try {
    const db = await connectDB();
    const collection = db.collection("clienti");

    const response = await collection.deleteOne({ cod: cod });

    if (!response) {
      return res
        .status(404)
        .json({ error: `Clientul ${cod} nu a fost găsit.` });
    }

    return res.status(200).json({
      succes: `Clientul ${cod} a fost stears cu succes.`,
    });
  } catch (error) {
    res.status(500).json({ error: "Eroare la stergerea Clientului " + cod });
  }
};

module.exports = {
  getAllCustomers,
  getOneCustomer,
  postOneCustomer,
  updateOneCustomer,
  deleteOneCustomer,
};
