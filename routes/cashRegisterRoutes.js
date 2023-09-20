const connectDB = require("../db");

const getAllReceipes = async (req, res) => {
  try {
    const db = await connectDB();
    const collection = db.collection("casa");

    const receipes = await collection.find({}).toArray();

    res.json(receipes);
  } catch (error) {
    console.error("Eroare la preluarea listei de bonuri fiscale:", error);
    res
      .status(500)
      .json({ error: "Eroare la preluarea listei de bonuri fiscale" });
  }
};

const postOneReceipe = async (req, res) => {
  const receipe = req.body;

  try {
    const db = await connectDB();
    const collection = db.collection("casa");

    const response = await collection.insertOne(receipe);

    if (!response.acknowledged) {
      return res.status(200).json({
        message: `Bonul ${receipe.nrBon} nu a fost gasit`,
        response: response.acknowledged,
      });
    }

    return res
      .status(200)
      .json({
        message: `Bonul ${receipe.nrBon} a fost adaugat cu succes`,
        response: response.acknowledged,
      });
  } catch (error) {
    res
      .status(500)
      .json({ error: `Eroare la adaugarea bonului ${receipe.nrBon}` });
  }
};

const updateOneReceipe = async (req, res) => {
  const { nrBon } = req.params;
  const body = req.body;

  try {
    const db = await connectDB();
    const collection = db.collection("casa");

    const response = await collection.updateOne(
      { nrBon: nrBon },
      { $set: body }
    );

    if (response.matchedCount === 0) {
      return res
        .status(200)
        .json({ message: `Bonul ${nrBon} nu a fost găsit.`, response: {} });
    }

    if (response.modifiedCount !== 0) {
      return res
        .status(200)
        .json({ message: `Bonul ${nrBon} a fost actualizata cu succes.`, response: response.modifiedCount });
    }
  } catch (error) {
    res.status(500).json("Eroare la actualizarea bonului " + nrBon);
  }
};

module.exports = {
  getAllReceipes,
  postOneReceipe,
  updateOneReceipe,
};
