const database=require("../database")

const login = (req, res)=>{
    /*
    GET Request
    Body Format: {
        "username":"...",
        "password":"..."
    }
    */
    username = req.body.username
    password = req.body.password

    const query='SELECT password FROM users WHERE(users.username=?)'
    const values=[username, password]
    database.query(query, values, (error, results, fields) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ success: false, msg: "Failed to retrieve user" });
    }
    if (results.length === 0) {
      return res.status(400).json({ success: false, msg: "User with username does not exist" });
    }
    if(results[0].password===password){
        return res.status(200).json({ success: true, msg: "User successfully logged in" });
    }
    else{
        return res.status(401).json({ success: false, msg: "Wrong password" });
    }
  });
};
const register = (req, res)=>{
    
}

module.exports={login, register}