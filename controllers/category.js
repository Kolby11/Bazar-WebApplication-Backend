const database = require("../utils/database");
const util = require("util");

const queryAsync = util.promisify(database.query).bind(database);

const getAllCategories = async (req, res) => {
   try {
      const query = `SELECT * FROM categories`;
      const results = await queryAsync(query);
      return res.status(200).json({ success: true, data: results });
   } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, msg: "Failed to retrieve categories" });
   }
};

module.exports = {
   getAllCategories,
};
