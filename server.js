const express = require("express");
const app = express();

// middleware

app.use((req, res, next) => {
   res.setHeader("Access-Control-Allow-Origin", "*");
   res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
   res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
   next();
});

// parse json
app.use(express.json());
app.use(express.urlencoded());

// routes
const listings = require("./routes/listing");
const users = require("./routes/user");
const categories = require("./routes/category");
const auth = require("./routes/auth");

app.use("/api/v1/listing", listings);
app.use("/api/v1/user", users);
app.use("/api/v1/category", categories);
app.use("/api/v1/auth", auth);

const port = 5000;

app.listen(port, () => console.log(`Server is listening on port ${port}`));
