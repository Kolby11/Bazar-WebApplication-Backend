const express = require("express");
const router = express.Router();

const { postLogin, postRegister, postLogout } = require("../controllers/auth");

router.route("/login").post(postLogin);
router.route("/register").post(postRegister);
router.route("/logout").post(postLogout);

module.exports = router;
