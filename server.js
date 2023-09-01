require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const {
  getAllNecesar,
  getOneFileNecesar,
  postNecesarFile,
  updateNecesarFile,
  deleteNecesarFile,
} = require("./routes/ruteNecesar");
const {
  getAllpredare,
  getOnePredareFile,
  updateOnePredareFile,
  postOnePredareFile,
  deleteOnePredareFile,
} = require("./routes/rutePredare");
const {
  getAllEmployees,
  getOneEchipamentFile,
  updateEchipamentFile,
  postOneEchipoamentFile,
} = require("./routes/ruteEmployees");
const {
  getAllRetur,
  postOneReturFile,
  updateOneReturFile,
  deleteOneReturFile,
  getOneReturFile,
} = require("./routes/ruteRetur");
const {
  getNecesarTemplate,
  getPvrTemplate,
  getPvppTemplate,
} = require("./routes/ruteFisiere");
const {
  getAllInvoices,
  postOneInvoice,
  getOneInvoice,
  deleteOneInvoice,
  updateOneInvoice,
} = require("./routes/ruteFacturi");
const { getAllUsers, getOneUser } = require("./routes/ruteUtilizatori");

// Middlewares
app.use(express.json());
app.use(cors());

//Rute facturi

app.get("/coral/it/facturi", getAllInvoices);

app.post("/coral/it/factura", postOneInvoice);

app.delete("/coral/it/factura/:id", deleteOneInvoice);

app.get("/coral/it/factura/:id", getOneInvoice);

app.put("/coral/it/factura/:id", updateOneInvoice);

// Rute Necesar

app.get("/coral/it/necesar", getAllNecesar);

app.get("/coral/it/necesar/:fisa", getOneFileNecesar);

app.post("/coral/it/necesar", postNecesarFile);

app.put("/coral/it/necesar/:fisa", updateNecesarFile);

app.delete("/coral/it/necesar/:fisa", deleteNecesarFile);

// Rute echipament

app.get("/api/nymphaea/employees", getAllEmployees);

app.get("/coral/it/echipament/:cit", getOneEchipamentFile);

app.put("/coral/it/echipament/:cit", updateEchipamentFile);

app.post("/coral/it/echipament/", postOneEchipoamentFile);

// Rute Predare

app.get("/coral/it/predare", getAllpredare);

app.get("/coral/it/predare/:pv", getOnePredareFile);

app.put("/coral/it/predare/:pv", updateOnePredareFile);

app.delete("/coral/it/predare/:pv", deleteOnePredareFile);

app.post("/coral/it/predare", postOnePredareFile);

// Rute Retur

app.get("/coral/it/retur", getAllRetur);

app.get("/coral/it/retur/:pv", getOneReturFile);

app.post("/coral/it/retur", postOneReturFile);

app.put("/coral/it/retur/:pv", updateOneReturFile);

app.delete("/coral/it/retur/:pv", deleteOneReturFile);

// Rute Fisiere

app.get("/coral/it/templates/necesar.docx", getNecesarTemplate);

app.get("/coral/it/templates/predare.docx", getPvppTemplate);

app.get("/coral/it/templates/retur.docx", getPvrTemplate);

// Rute Utilizatori
app.get("/coral/users", getAllUsers);

app.get("/coral/users/:id", getOneUser);

// Pornirea serverului
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Serverul rulează la adresa http://localhost:${port}`);
});
