const database = require("../utils/database");

const getAllCategories = async (req, res) => {
   try {
      const query = `SELECT * FROM categories`;
      const results = await database.query(query);
      return res.status(200).json({ success: true, data: results });
   } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, msg: "Failed to retrieve categories" });
   }
};

module.exports = {
   getAllCategories,
};
