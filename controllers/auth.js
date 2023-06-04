const database = require("../utils/database");
const { addUserSession, removeUserSession, hashText } = require("../utils/authUtils");
const util = require("util");

const queryAsync = util.promisify(database.query).bind(database);

const postLogin = async (req, res) => {
   const data = req.body.data;
   if (!data) {
      return res.status(400).json({ success: false, msg: "Missing login data" });
   }
   const { email, password } = data;
   // Validate required fields
   if (!email || !password) {
      return res.status(400).json({ success: false, msg: "Missing required fields" });
   }

   const sessionStr = await addUserSession(email, password);

   if (sessionStr) {
      return res.status(200).json({ success: true, sessionStr: sessionStr });
   } else {
      return res.status(500).json({ success: false, msg: "Session not generated" });
   }
};

const postRegister = async (req, res) => {
   const queryStr =
      "INSERT INTO users (username, email, password, phone_number) VALUES (?, ?, ?, ?)";
   const data = req.body.data;
   if (!data) {
      return res.status(400).json({ success: false, msg: "Missing register data" });
   }
   const { username, email, password, phone_number } = data;

   // Validate required fields
   if (!username || !email || !password || !phone_number) {
      return res.status(400).json({ success: false, msg: "Missing required fields" });
   }
   const hashedPassword = hashText(password);
   const values = [username, email, hashedPassword, phone_number];

   try {
      const result = await queryAsync(queryStr, values);
      if (result.affectedRows > 0) {
         return res.status(200).json({ success: true, msg: "Registration successful" });
      } else {
         return res.status(500).json({ success: false, msg: "Registration failed" });
      }
   } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, msg: "Internal server error" });
   }
};

const postLogout = (req, res) => {
   const sessionStr = req.body.sessionStr;
   //Checks sessionStr
   if (!sessionStr) {
      return res.status(400).json({ success: false, msg: "No session string found" });
   }
   const removed = removeUserSession(sessionStr);

   if (removed) {
      return res.status(200).json({ success: true, msg: "Logout successful" });
   } else {
      return res.status(404).json({ success: false, msg: "Invalid session string" });
   }
};

module.exports = { postLogin, postRegister, postLogout };
