const express=require("express")
const router = express.Router();

const {getAllUsers, createUser, getUser, editUser, deleteUser}=require('../controllers/users')

router.route("/").get(getAllUsers)
router.route("/createUser").post(createUser)
router.route("/getUser/:id").get(getUser)
router.route("/editUser/:id").put(editUser)
router.route("/deleteUser/:id").delete(deleteUser)

module.exports = router