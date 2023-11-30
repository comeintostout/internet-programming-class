var mongoose = require("mongoose");
var express = require("express");
var router = express.Router();

const MONGO_URL = "mongodb://localhost:27017";
const MONGO_DB_NAME = "school";

var student_schema = new mongoose.Schema({
  name: String,
  id: String,
  password: String,
  email: String,
  address: String,
  phone: String,
  schoolname: String,
  major: String,
  interests: String,
});

/* GET users listing. */
router.get("/", async function (req, res, next) {
  let address = req.query["address"];
  if (!address || address == "") address = "Seoul";

  mongoose
    .connect(MONGO_URL, { dbName: MONGO_DB_NAME })
    .then(() => console.log("Successfully connected to mongodb"))
    .catch((e) => console.error(e));

  var stds = mongoose.model("students", student_schema);

  const userList = await stds.find({ address: address });

  res.render("user", { users: userList });
});

module.exports = router;
