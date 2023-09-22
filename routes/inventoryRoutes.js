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
  const { nrInv } = req.params;
  try {
    const db = await connectDB();
    const collection = db.collection("stocuri");

    const response = await collection.findOne(
      { nrInv: nrInv },
      { returnDocument: "after" }
    );

    if (!response) {
      return res
        .status(404)
        .json({ message: `Produsul ${nrInv} nu a fost gasit` });
    }

    return res.status(200).json({
      response: response,
      message: `Produsul ${nrInv} a fost preluat cu succes`,
    });
  } catch (error) {
    res.status(500).json("Eroare la preluarea Produsului " + nrInv);
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
        .json({ message: `Produsul ${product.nrInv} nu a fost gasit` });
    }

    return res
      .status(200)
      .json({ message: `Produsul ${product.nrInv} a fost adaugat cu succes` });
  } catch (error) {
    res
      .status(500)
      .json({ error: `Eroare la adaugarea Produsului ${product.nrInv}` });
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
        .json({ message: `Produsul ${cod} a fost actualizata cu succes.` });
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
