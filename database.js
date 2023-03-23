const mysql= require('mysql');

const connection = mysql.createConnection({
  host:'localhost',
  user:'Bazar Database Admin',
  password:'test',
  database:'bazar'
});

//connect to database
connection.connect((err)=>{
    if(err) throw err
    console.log("Connected to database")
});

module.exports=connection