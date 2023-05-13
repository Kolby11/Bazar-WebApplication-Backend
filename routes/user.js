const express=require("express")
const router = express.Router();

const {getAllUsers, getUser, editUser, deleteUser}=require('../controllers/user')

router.route("/").get(getAllUsers)
router.route("/getUser/:id").get(getUser)
router.route("/editUser/:id").put(editUser)
router.route("/deleteUser/:id").delete(deleteUser)

module.exports = router