const MongoClient = require("mongodb").MongoClient;

const ObjectId = require("mongodb").ObjectId;

const url = "mongodb://127.0.0.1:27017/amazon";

const createProduct = async (req, res, next) => {
  const newProduct = {
    name: req.body.name,
    price: req.body.price,
  };
  const client = new MongoClient(url);

  try {
    await client.connect();
    const db = client.db("amazon");
    const result = await db.collection("products").insertOne(newProduct);
  } catch (error) {
    return res.json({ message: "Could not store data." });
  }
  client.close();

  res.json(newProduct);
};

const getProducts = async (req, res, next) => {
  const client = new MongoClient(url);
  let result = {};

  try {
    await client.connect();
    const db = client.db("amazon");
    result = await db
      .collection("products")
      .find({})
      .toArray(function (error, result) {
        if (error) {
          console.log(error);
        }
        res.json(result);

        client.close();
      });
    console.log(result);
  } catch (error) {
    return res.json({ message: "Could not get data" });
  }
};

const getProduct = async (req, res, next) => {
  const client = new MongoClient(url);
  let result = {};

  try {
    await client.connect();
    const db = client.db("amazon");
    result = await db
      .collection("products")
      .find({
        _id: new ObjectId("61b7836f9bce30ced02c4b64"),
      })
      .toArray(function (error, result) {
        if (error) {
          console.log(error);
        }
        res.json(result);

        client.close();
      });
    console.log(result);
  } catch (error) {
    return res.json({ message: "Could not get data" });
  }
};

exports.createProduct = createProduct;
exports.getProducts = getProducts;
exports.getProduct = getProduct;
