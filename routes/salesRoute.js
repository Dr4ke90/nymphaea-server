const connectDB = require("../db");

const getAllSales = async (req, res) => {
  try {
    const db = await connectDB();
    const collection = db.collection("incasari");

    const sales = await collection.find({}).toArray();

    res.json(sales);
  } catch (error) {
    console.error("Eroare la preluarea listei de Incasari:", error);
    res.status(500).json({ error: "Eroare la preluarea listei de Incasari" });
  }
};

const getOneSale = async (req, res) => {
  const { cod } = req.params;
  try {
    const db = await connectDB();
    const collection = db.collection("incasari");

    const response = await collection.findOne(
      { cod: cod },
      { returnDocument: "after" }
    );

    if (!response) {
      return res.status(200).json({
        message: `Incasarea ${cod} nu a fost gasita`,
        response: {},
      });
    }

    return res.status(200).json({
      response: response,
      message: `Incasarea ${cod} a fost preluata cu success`,
    });
  } catch (error) {
    res.status(500).json("Eroare la preluarea Incasarii " + cod);
  }
};

const postOneSale = async (req, res) => {
  const sale = req.body;

  try {
    const db = await connectDB();
    const collection = db.collection("incasari");

    const response = await collection.insertOne(sale);

  console.log(response)


    if (!response.acknowledged) {
      return res.status(200).json({
        message: `Incasarea ${sale.cod} nu a fost adaugata`,
        response: {},
      });
    }

    return res.status(200).json({
      message: `Incasarea ${sale.cod} a fost adaugata cu success`,
      response: response,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: `Eroare la adaugarea Incasarii ${sale.cod}` });
  }
};

module.exports = {
  getAllSales,
  getOneSale,
  postOneSale,
};
