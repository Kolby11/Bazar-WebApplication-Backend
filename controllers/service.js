const database = require("../database");
const session = require("../session");
const authUtils = require("../utils/authUtils")

const createLoginIndentifier = (userId) => {
  let identifier = "";
  for (let i = 1; i < 5; i++) {
    const randomNumberStr = Math.floor(Math.random() * 10).toString();
    identifier += randomNumberStr;
  }
  if (!(identifier in session.loggedUsers)) {
    return identifier;
  } else {
    return createLoginIndentifier(userId);
  }
};

const login = (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const query = 'SELECT id, password FROM users WHERE (users.username = ?)';
  const values = [username];

  database.query(query, values, (error, results, fields) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ success: false, msg: "Failed to retrieve user" });
    }
    if (results.length === 0) {
      return res.status(400).json({ success: false, msg: "User with username does not exist" });
    }

    const userId = results[0].id;

    if (results[0].password === password) {
      for (const identifier in session.loggedUsers) {
        if (session.loggedUsers[identifier] === userId) {
          return res.status(409).json({ success: false, msg: "User is already logged in" });
        }
      }

      const authId = authUtils.createUserAuth(userId)
      session.loggedUsers[authId] = userId;
      return res.status(200).json({ success: true, msg: "User successfully logged in", userAuth: authId});
    } else {
      return res.status(401).json({ success: false, msg: "Wrong password" });
    }
  });
};

const register = (req, res) => {
  const user=req.body.user
  if (user) {
    const query = `INSERT INTO users (username, password, email, phone_number) VALUES (?, ?, ?, ?)`;
    const values = [
      user.username,
      user.password,
      user.email,
      user.phone_number,
    ];
    database.query(query, values, (error, results, fields) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ success: false, msg: "Failed to register" });
      }

      return res.status(201).json({ success: true, msg: "User registered successfully", id: results.insertId });
    });
  } else {
    return res.status(400).json({ success: false, msg: "Please provide user" });
  }
};


const logout = (req, res) => {
  const sessionUserId = req.body.sessionUserId;
  if (session.loggedUsers.hasOwnProperty(sessionUserId)) {
    delete session.loggedUsers[sessionUserId];
    return res.status(200).json({ success: true, msg: "User successfully logged out" });
  }
  // If the key doesn't exist, return an error response.
  return res.status(404).json({ success: false, msg: "User session not found" });
};


module.exports = { login, register, logout }; 
