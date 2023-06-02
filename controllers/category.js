const database = require("../utils/database");

//getting all listings
const getAllCategories = (req, res) => {
   let query = `SELECT * FROM categories`;
   const values = [];
   database.query(query, values, (error, results, fields) => {
      if (error) {
         console.error(error);
         return res.status(500).json({ success: false, msg: "Failed to retrieve categories" });
      }
      return res.status(200).json({ success: true, data: results });
   });
};

module.exports = {
   getAllCategories,
};
