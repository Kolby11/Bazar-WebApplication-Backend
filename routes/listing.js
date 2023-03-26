const express=require("express")
const router = express.Router();

const {getAllListings, createListing, getListing, editListing, deleteListing} = require("../controllers/listing")

router.route("/").get(getAllListings)
router.route("/createListing").post(createListing)
router.route("/getListing/:id").get(getListing)
router.route("/editListing/:id").put(editListing)
router.route("/deleteListing/:id").delete(deleteListing)

module.exports = router