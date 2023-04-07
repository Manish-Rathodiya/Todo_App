//importing required packages
const mysql = require("mysql");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");


app.set("view engine", "ejs");
app.use(express.static("views"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Creating MySQL connection
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "test",
});

//Connecting to MySQL & Creating a table in the database
connection.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    const sql = "CREATE TABLE IF NOT EXISTS cruddata (id int AUTO_INCREMENT PRIMARY KEY, name varchar(100))";
    connection.query(sql, (err, result) => {
      if (err) {
        console.log(err);
      }
    })
    console.log("MySQL Connected");
  }
});

// Displaying data from MySQL table
app.get("/", (req, res) => {
  const sql = "SELECT * FROM cruddata";
  connection.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.render("index", { todos: result });
    }
  });
});

// Saving data into MySQL
app.post("/", (req, res) => {
  const { body: { name } } = req,
    sql = `INSERT INTO cruddata (name) VALUE ("${name}") `;
  connection.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/");
    }
  });
});

// Deleting data of MySQL table
app.get("/remove/:id", (req, res,) => {
  const { params: { id } } = req,
    sql = `DELETE FROM cruddata WHERE id= "${id}"`;
  connection.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/");
    }
  });
});

// Rendering Update page
app.get("/edit/:id", (req, res) => {
  const { params: { id } } = req,
    sql = `SELECT * FROM cruddata WHERE id= '${id}'`;
  connection.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.render("edit.ejs", { todos: result });
    }
  });
});

//Updating data of MySQL table
app.post("/update/:id", (req, res) => {
  const { params: { id }, body: { name } } = req,
    sql = `UPDATE cruddata SET name='${name}' WHERE id='${id}'`;
  connection.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/");
    }
  });
});

//Listening port
app.listen(3000, () => {
  console.log("port started at 3000");
});
