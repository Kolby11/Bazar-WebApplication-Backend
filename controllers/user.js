const database = require("../utils/database");
const authUtils = require("../utils/authUtils");
const util = require("util");

const queryAsync = util.promisify(database.query).bind(database);

// Getting all users
const getAllUsers = async (req, res) => {
   const from = Number(req.query.from) - 1;
   const to = Number(req.query.to);
   let query = `SELECT id, username, email, phone_number FROM users`;
   let values = [];
   if (from && to) {
      limit = to - from;
      query = `SELECT id, username, email, phone_number FROM users LIMIT ? OFFSET ?`;
      values = [limit, from];
   } else if (from && !to) {
      query = `SELECT id, username, email, phone_number FROM users LIMIT 100 OFFSET ?`;
      values = [from];
   } else if (to && !from) {
      query = `SELECT id, username, email, phone_number FROM users LIMIT ? `;
      values = [to];
   }
   try {
      const results = await queryAsync(query, values);
      return res.status(200).json({ success: true, data: results });
   } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, msg: "Failed to retrieve users" });
   }
};

// Getting a single user
const getUser = async (req, res) => {
   const { id } = req.params;
   if (!id) {
      return res.status(400).json({ success: false, msg: "Please provide an id" });
   }
   try {
      const queryStr = `SELECT id, username, email, phone_number FROM users WHERE id = ?`;
      const results = await queryAsync(queryStr, id);
      if (!results || results.length === 0) {
         return res.status(404).json({ success: false, msg: "User not found" });
      }
      return res.status(200).json({ success: true, data: results[0] });
   } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, msg: "Failed to retrieve user" });
   }
};

// Editing a user
const editUser = async (req, res) => {
   const id = req.params.id;
   const sessionStr = req.body.sessionStr;
   const { username, password, email, phone_number } = req.body.user;

   if (!authUtils.isUserOwner(sessionStr)) {
      return res.status(403).json({ success: false, msg: "You are not the owner of the account" });
   }

   if (!id || (!username && !password && !email && !phone_number)) {
      return res
         .status(400)
         .json({ success: false, msg: "Please provide an id and at least one field to update" });
   }

   const updates = {};
   if (username) {
      updates.username = username;
   }
   if (password) {
      updates.password = password;
   }
   if (email) {
      updates.email = email;
   }
   if (phone_number) {
      updates.phone_number = phone_number;
   }

   try {
      const queryStr = `UPDATE users SET ? WHERE id = ?`;
      const results = await queryAsync(queryStr, [updates, id]);
      if (results.affectedRows === 0) {
         return res.status(404).json({ success: false, msg: "User not found" });
      }
      return res.status(200).json({ success: true, msg: "User updated successfully" });
   } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, msg: "Failed to update user" });
   }
};

// Deleting a user
const deleteUser = async (req, res) => {
   const id = req.params.id;
   const sessionStr = req.body.sessionStr;
   if (!authUtils.isUserOwner(sessionStr)) {
      return res.status(403).json({ success: false, msg: "You are not the owner of the account" });
   }
   if (id) {
      try {
         const queryStr = `DELETE FROM users WHERE id = ?`;
         const result = await queryAsync(queryStr, id);
         if (result.affectedRows === 0) {
            res.status(400).json({ success: false, msg: "User with id does not exist" });
         } else {
            res.json({ success: true, msg: `User with id ${id} has been deleted` });
         }
      } catch (error) {
         console.error(error);
         return res.status(500).json({ success: false, msg: "Failed to delete user" });
      }
   } else {
      res.status(400).json({ success: false, msg: "Id is not defined" });
   }
};

module.exports = {
   getAllUsers,
   getUser,
   editUser,
   deleteUser,
};
