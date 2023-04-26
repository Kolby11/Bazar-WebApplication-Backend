const { query } = require("express")
const database=require("../database")

const login = (req, res)=>{
    const query='SELECT * FROM users WHERE(users.username=? AND users.password=?)'
    const values=[req.body[0], req.body[1]]
    database.query(query, values)
}
const register = (req, res)=>{
    
}

module.exports={login, register}