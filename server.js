require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var con = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE
});

con.connect(err => {
  if (err) throw err;
  console.log("Connected!");
});

global.con = con;

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to EasyNotes"
  });
});

// Require Notes routes
require("./app/routes/note.routes.js")(app);

app.listen(process.env.PORT, () => {
  console.log("server is listening on port 3000");
});
