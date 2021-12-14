const express = require("express");
const bodyParser = require("body-parser");
const mongoPractice = require("./mongo");

const app = express();

app.use(bodyParser.json());

app.post("/products", mongoPractice.createProduct);

app.get("/products", mongoPractice.getProducts);

app.get("/product", mongoPractice.getProduct);

app.listen(5000);