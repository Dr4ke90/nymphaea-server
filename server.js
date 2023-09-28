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
} = require("./routes/invoicesRoutes");
const {
  getAllInventory,
  postOneProduct,
  getOneProduct,
  updateOneProduct,
} = require("./routes/inventoryRoutes");
const { getAllReceipes, postOneReceipe, updateOneReceipe } = require("./routes/cashRegisterRoutes");
const { getAllSales, postOneSale, getOneSale } = require("./routes/salesRoute");


// Middlewares
app.use(express.json());
app.use(cors());


//Rute facturi
app.get("/api/nymphaea/invoices", getAllInvoices);
app.post("/api/nymphaea/invoices", postOneInvoice);
app.delete("/api/nymphaea/invoices/:id", deleteOneInvoice);
app.get("/api/nymphaea/invoices/:id", getOneInvoice);
app.put("/api/nymphaea/invoices/:id", updateOneInvoice);

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

// Rute Stocuri
app.get("/api/nymphaea/inventory", getAllInventory);
app.get("/api/nymphaea/inventory/:cod", getOneProduct);
app.post("/api/nymphaea/inventory", postOneProduct);
app.put("/api/nymphaea/inventory/:cod", updateOneProduct);

// Rute Casa
app.get("/api/nymphaea/casa", getAllReceipes);
app.post("/api/nymphaea/casa", postOneReceipe);
app.put("/api/nymphaea/casa/:nr", updateOneReceipe);

// Rute Incasari
app.get("/api/nymphaea/sales", getAllSales);
app.post("/api/nymphaea/sales", postOneSale);
app.get("/api/nymphaea/sales/:cod", getOneSale);


// Pornirea serverului
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Serverul asculta pe portul ${port}`);
});
