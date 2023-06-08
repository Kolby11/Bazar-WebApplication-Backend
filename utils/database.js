const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "Bazar Database Admin",
  password: "SecretAdminPassword2023",
  database: "bazar",
});

//connect to database
connection.connect((err) => {
  if (err) {
    console.log("Cannot connect to database");
    throw err;
  }
  console.log("Connected to database");
});

module.exports = connection;
