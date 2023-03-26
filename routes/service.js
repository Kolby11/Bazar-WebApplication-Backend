const express=require("express")
const router=express.Router()

const { login, register } = require("../controllers/service")

router.route("/login").get(login)
router.route("/register").post(register)

module.exports=router