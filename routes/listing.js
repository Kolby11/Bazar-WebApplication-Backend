const express = require("express");
const router = express.Router();

const {
   getAllListings,
   createListing,
   getListing,
   getUserListings,
   editListing,
   deleteListing,
   getFilteredListings,
   saveListing,
} = require("../controllers/listing");

router.route("/").get(getAllListings);
router.route("/createListing").post(createListing);
router.route("/getListing/:id").get(getListing);
router.route("/getUserListings/:userId").get(getUserListings);
router.route("/editListing/:id").put(editListing);
router.route("/deleteListing/:id").delete(deleteListing);
router.route("/getFilteredListings").get(getFilteredListings);
router.route("/saveListing").post(saveListing);

module.exports = router;
