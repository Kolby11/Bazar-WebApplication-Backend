const express = require("express");
const router = express.Router();

const { saveListing, getSavedListings,removeSavedListing } = require("../controllers/saved");

router.route("/saveListing").post(saveListing);
router.route("/removeSavedListing").post(removeSavedListing);
router.route("/savedListings/:sessionStr").get(getSavedListings);

module.exports = router;
