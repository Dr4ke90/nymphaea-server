require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const {
  getAllServices,
  getOneService,
  postServiciu,
  updateServiciu,
  deleteServiciu,
} = require("./routes/servicesRoutes");
const {
  getAllCustomers,
  getOneCustomer,
  updateOneCustomer,
  postOneCustomer,
  deleteOneCustomer,
} = require("./routes/customersRoutes");
const {
  getAllEmployees,
  postOneEmployee,
  getOneEmployee,
  updateOneEmployee,
  deleteOneEmployee,
} = require("./routes/employeesRoutes");
const {
  getAllAppointments,
  postOneAppointment,
  updateOneAppointment,
  deleteOneAppointment,
  getOneAppointment,
} = require("./routes/appointmentsRoutes");
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
app.get("/api/nymphaea/facturi", getAllInvoices);
app.post("/api/nymphaea/factura", postOneInvoice);
app.delete("/api/nymphaea/factura/:id", deleteOneInvoice);
app.get("/api/nymphaea/factura/:id", getOneInvoice);
app.put("/api/nymphaea/factura/:id", updateOneInvoice);

// Rute Servicii
app.get("/api/nymphaea/services", getAllServices);
app.get("/api/nymphaea/services/:cod", getOneService);
app.post("/api/nymphaea/services", postServiciu);
app.put("/api/nymphaea/services/:cod", updateServiciu);
app.delete("/api/nymphaea/services/:cod", deleteServiciu);

// Rute Angajati
app.get("/api/nymphaea/employees", getAllEmployees);
app.get("/api/nymphaea/employees/:cod", getOneEmployee);
app.post("/api/nymphaea/employees", postOneEmployee);
app.put("/api/nymphaea/employees/:cod", updateOneEmployee);
app.delete("/api/nymphaea/employees/:cod", deleteOneEmployee);

// Rute Clienti
app.get("/api/nymphaea/customers", getAllCustomers);
app.get("/api/nymphaea/customers/:cod", getOneCustomer);
app.put("/api/nymphaea/customers/:cod", updateOneCustomer);
app.delete("/api/nymphaea/customers/:cod", deleteOneCustomer);
app.post("/api/nymphaea/customers", postOneCustomer);

// Rute Retur
app.get("/api/nymphaea/appointments", getAllAppointments);
app.get("/api/nymphaea/appointments/:nr", getOneAppointment);
app.post("/api/nymphaea/appointments", postOneAppointment);
app.put("/api/nymphaea/appointments/:nr", updateOneAppointment);
app.delete("/api/nymphaea/appointments/:nr", deleteOneAppointment);

// Rute Utilizatori
app.get("/coral/users", getAllUsers);
app.get("/coral/users/:id", getOneUser);

// Pornirea serverului
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Serverul rulează la adresa http://localhost:${port}`);
});
