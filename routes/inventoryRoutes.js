const connectDB = require("../db");

const getAllInventory = async (req, res) => {
  try {
    const db = await connectDB();
    const collection = db.collection("stocuri");

    const customers = await collection.find({}).toArray();

    res.json(customers);
  } catch (error) {
    console.error("Eroare la preluarea listei de Stocuri:", error);
    res.status(500).json({ error: "Eroare la preluarea listei de Stocuri" });
  }
};

const getOneProduct = async (req, res) => {
  const { cod } = req.params;
  try {
    const db = await connectDB();
    const collection = db.collection("stocuri");

    const response = await collection.findOne(
      { cod: cod },
      { returnDocument: "after" }
    );

    if (!response) {
      return res
        .status(200)
        .json({ message: `Produsul ${cod} nu a fost gasit`, response: {} });
    }

    return res.status(200).json({
      response: response,
      message: `Produsul ${cod} a fost preluat cu succes`,
    });
  } catch (error) {
    res.status(500).json("Eroare la preluarea Produsului " + cod);
  }
};

const postOneProduct = async (req, res) => {
  const product = req.body;

  try {
    const db = await connectDB();
    const collection = db.collection("stocuri");

    const response = await collection.insertOne(product);

    if (!response.acknowledged) {
      return res
        .status(200)
        .json({ message: `Produsul ${product.cod} nu a fost gasit` });
    }

    return res
      .status(200)
      .json({ message: `Produsul ${product.cod} a fost adaugat cu succes` });
  } catch (error) {
    res
      .status(500)
      .json({ error: `Eroare la adaugarea Produsului ${product.cod}` });
  }
};

const updateOneProduct = async (req, res) => {
  const { cod } = req.params;
  const data = req.body;
  
  try {
    const db = await connectDB();
    const collection = db.collection("stocuri");

    const response = await collection.updateOne({ cod: cod }, { $set: data });

    if (response.matchedCount === 0) {
      return res.status(200).json({
        message: `Produsul ${cod} nu a fost găsit.`,
        response: response.matchedCount,
      });
    }

    if (response.modifiedCount !== 0) {
      return res
        .status(200)
        .json({
          message: `Produsul ${cod} a fost actualizata cu succes.`,
          response: data,
        });
    }
  } catch (error) {
    res.status(500).json("Eroare la actualizarea Produsuli " + cod);
  }
};

module.exports = {
  getAllInventory,
  getOneProduct,
  postOneProduct,
  updateOneProduct,
};
