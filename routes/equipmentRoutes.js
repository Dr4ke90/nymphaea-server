const connectDB = require("../db");

const getAllEquipment = async (req, res) => {
  try {
    const db = await connectDB();
    const collection = db.collection("echipament");

    const equipment = await collection.find({}).toArray();

    res.json(equipment);
  } catch (error) {
    console.error("Eroare la preluarea listei de Echipament:", error);
    res.status(500).json({ error: "Eroare la preluarea listei de Echipament" });
  }
};

const getOneEquipment = async (req, res) => {
  const { cod } = req.params;
  try {
    const db = await connectDB();
    const collection = db.collection("echipament");

    const response = await collection.findOne(
      { cod: cod },
      { returnDocument: "after" }
    );

    if (!response) {
      return res
        .status(200)
        .json({ message: `Echipamentul ${cod} nu a fost gasit`, response: {} });
    }

    return res.status(200).json({
      response: response,
      message: `Echipamentul ${cod} a fost preluat cu succes`,
    });
  } catch (error) {
    res.status(500).json("Eroare la preluarea Echipamentului " + cod);
  }
};

const postOneEchipament = async (req, res) => {
  const equip = req.body;

  try {
    const db = await connectDB();
    const collection = db.collection("echipament");

    const response = await collection.insertOne(equip);

    if (!response.acknowledged) {
      return res
        .status(200)
        .json({ message: `Echipamentul ${equip.cod} nu a fost gasit` });
    }

    return res
      .status(200)
      .json({ message: `Echipamentul ${equip.cod} a fost adaugat cu succes` });
  } catch (error) {
    res
      .status(500)
      .json({ error: `Eroare la adaugarea Echipamentului ${equip.cod}` });
  }
};

const updateOneEquipment = async (req, res) => {
  const { cod } = req.params;
  const data = req.body;
  
  try {
    const db = await connectDB();
    const collection = db.collection("echipament");

    const response = await collection.updateOne({ cod: cod }, { $set: data });

    if (response.matchedCount === 0) {
      return res.status(200).json({
        message: `Echipamentul ${cod} nu a fost găsit.`,
        response: response.matchedCount,
      });
    }

    if (response.modifiedCount !== 0) {
      return res
        .status(200)
        .json({
          message: `Echipamentul ${cod} a fost actualizata cu succes.`,
          response: data,
        });
    }
  } catch (error) {
    res.status(500).json("Eroare la actualizarea Produsuli " + cod);
  }
};

module.exports = {
  getAllEquipment,
  getOneEquipment,
  postOneEchipament,
  updateOneEquipment,
};
