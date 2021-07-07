const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");
const uuid = require("uuid");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "password",
  database: "mealplannerdatabase",
});

app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.post("/api/add-user", (req, res) => {
  const userId = uuid.v4();
  const enteredEmail = req.body.enteredEmail;
  const password = req.body.enteredPassword;
  const insertQuery = "INSERT INTO users VALUES (?,?,?);";
  db.query(
    "SELECT COUNT(email) from users WHERE email=?;",
    [enteredEmail],
    (error, result) => {
      res.send(result[0]);
    }
  );
  db.query(insertQuery, [userId, enteredEmail, password]);
});

app.listen(3001, () => {
  console.log("Running on port 3001");
});
