const express=require("express")
const router = express.Router();

const {getAllListings, createListing, getListing, getUserListings, editListing, deleteListing} = require("../controllers/listing")

router.route("/").get(getAllListings)
router.route("/createListing").post(createListing)
router.route("/getListing/:id").get(getListing)
router.route("/getUserListings/:userId").get(getUserListings)
router.route("/editListing/").put(editListing)
router.route("/deleteListing/").delete(deleteListing)

module.exports = router