const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const rentalRoutes = require("./routes/rentalRoutes");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use("/api", rentalRoutes);

module.exports = app;
