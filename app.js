const express = require("express");
// const { NotFoundError } = require("./expressError");
const app = express();

const itemRoutes = require('./itemRoutes');
// const middleware = require("./middleware");

app.use(express.json());

// apply a prefix to every route in itemRoutes
app.use("/items", itemRoutes);





module.exports = app;