const express=require("express")
const router=express.Router()

const { login, register, logout } = require("../controllers/service")

router.route("/login").get(login)
router.route("/register").post(register)
router.route("/logout").get(logout)

module.exports=router