const express=require("express");
const app=express();

// middleware
// parse json

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use(express.json())
app.use(express.urlencoded())

// routes
const listings=require("./routes/listing")
const users=require("./routes/user")

app.use('/api/v1/listing', listings)
app.use('/api/v1/user', users)

const port=5000

app.listen(port, ()=>console.log(`Server is listening on port ${port}`))