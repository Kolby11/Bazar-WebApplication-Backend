const database=require("../database")

//getting all users
const getAllUsers = (req, res) => {
  const limit = req.query.limit;
  if (limit) {
    database.query(`SELECT * FROM users LIMIT ?`, limit, (error, results, fields) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ success: false, msg: "Failed to retrieve users" });
      }
      return res.status(200).json({ success: true, data: results });
    });
  } else {
    database.query(`SELECT * FROM users`, (error, results, fields) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ success: false, msg: "Failed to retrieve users" });
      }
      return res.status(200).json({ success: true, data: results });
    });
  }
};

//creating user
const createUser = (req, res) => {
  const user = req.body;
  if (!user) {
    return res.status(400).json({ success: false, msg: "Please provide user data" });
  }
  const { username, password, email, phone_number } = user;
  database.query(`INSERT INTO users (username, password, email, phone_number) VALUES (?, ?, ?, ?)`, [username, password, email, phone_number], (error, results, fields) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ success: false, msg: "Failed to create user" });
    }
    return res.status(201).json({ success: true, data: { id: results.insertId, username, email, phone_number } });
  });
};


//getting single user
const getUser = (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ success: false, msg: "Please provide an id" });
  }
  database.query(`SELECT * FROM users WHERE id = ?`, id, (error, results, fields) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ success: false, msg: "Failed to retrieve user" });
    }
    if (!results || results.length === 0) {
      return res.status(404).json({ success: false, msg: "User not found" });
    }
    return res.status(200).json({ success: true, data: results[0] });
  });
};


//editing user
const editUser = (req, res) => {
  const { id } = req.params;
  const { username, password, email, phone_number } = req.body;

  if (!id || (!username && !password && !email && !phone_number)) {
    return res.status(400).json({ success: false, msg: "Please provide an id and at least one field to update" });
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

  database.query(`UPDATE users SET ? WHERE id = ?`, [updates, id], (error, results, fields) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ success: false, msg: "Failed to update user" });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ success: false, msg: "User not found" });
    }
    return res.status(200).json({ success: true, msg: "User updated successfully" });
  });
};


//delete user
const deleteUser = (req, res) => {
  const { id } = req.params;
  if (id) {
    database.query(`DELETE FROM users WHERE id=${id}`, (error, result) => {
      if (error) throw error;
      if (result.affectedRows === 0) {
        res.status(400).json({ success: false, msg: "User with id does not exist" });
      } else {
        res.json({ success: true, msg: `User with id ${id} has been deleted` });
      }
    });
  } else {
    res.status(400).json({ success: false, msg: "Id is not defined" });
  }
}


module.exports={
    getAllUsers, createUser, getUser, editUser, deleteUser
}