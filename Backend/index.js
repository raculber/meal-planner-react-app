const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");
const uuid = require("uuid");
const sha1 = require("sha1");

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
  const encryptedPassword = sha1(password);
  const insertQuery = "INSERT INTO users VALUES (?,?,?);";
  db.query(
    "SELECT COUNT(email) from users WHERE email=?;",
    [enteredEmail],
    (error, result) => {
      res.send([result[0], userId]);
    }
  );
  db.query(insertQuery, [userId, enteredEmail, encryptedPassword]);
});

app.post("/api/sign-in", (req, res) => {
  const enteredPassword = req.body.enteredPassword;
  const enteredEmail = req.body.enteredEmail;
  const encryptedPassword = sha1(enteredPassword);
  db.query(
    "SELECT userId from users WHERE email=? AND password=?;",
    [enteredEmail, encryptedPassword],
    (error, result) => {
      if (error) {
        res.send(error);
      } else {
        res.send(result[0]);
      }
    }
  );
});

app.post("/api/add-recipe", (req, res) => {
  const recipeId = uuid.v4();
  const userId = req.body.userId;
  const enteredName = req.body.enteredName;
  const enteredType = req.body.enteredType;
  const enteredServings = req.body.enteredServings;
  const insertQuery = "INSERT INTO recipes VALUES (?,?,?,?,?);";

  db.query(
    insertQuery,
    [recipeId, userId, enteredName, enteredType, enteredServings],
    (error, result) => {
      if (error) {
        res.send(error);
      } else {
        res.send(result);
      }
    }
  );
});
app.get("/api/recipes", (req, res) => {
  const userId = req.query.userId;
  const selectQuery =
    "SELECT recipes.recipeId, recipes.name, recipes.type, recipes.servings FROM " +
    " recipes INNER JOIN users ON recipes.r_userId=users.userId WHERE users.userId=?;";
  db.query(selectQuery, [userId], (error, result) => {
    if (error) {
      res.send(error);
    } else {
      console.log(result);
      res.send(result);
    }
  });
});
app.listen(3001, () => {
  console.log("Running on port 3001");
});
