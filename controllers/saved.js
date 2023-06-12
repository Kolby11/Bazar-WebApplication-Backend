const database = require("../utils/database");
const authUtils = require("../utils/authUtils");
const util = require("util");

const queryAsync = util.promisify(database.query).bind(database);


const saveListing = async (req, res) => {
	const query = `INSERT INTO saved (user_id, listing_id) VALUES (?, ?)`;
	const {sessionStr, listingId} = req.body;

	const userId=authUtils.getUserIdWithSessionStr(sessionStr);

  if (!sessionStr) {
		return res.status(401).json({ success: false, msg: "Missing sessionStr" });
	}
	if (!userId) {
		return res.status(401).json({ success: false, msg: "User is not logged in" });
	}
	if (!listingId) {
		return res.status(401).json({ success: false, msg: "Missing listing id" });
	}
	const values = [userId, listingId];
	try {
		const results = await queryAsync(query, values);
		return res
			.status(201)
			.json({ success: true, msg: "Listing saved" });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ success: false, msg: "Failed to save listing" });
	}
};

const getSavedListings = async (req, res) => {
	const query = `SELECT listings.* FROM listings
	RIGHT JOIN saved ON listings.id = saved.listing_id WHERE saved.user_id=?`;
	const {sessionStr} = req.params;

	const userId=authUtils.getUserIdWithSessionStr(sessionStr);

  if (!sessionStr) {
		return res.status(401).json({ success: false, msg: "Missing sessionStr" });
	}
	if (!userId) {
		return res.status(401).json({ success: false, msg: "User is not logged in" });
	}
	try {
		const results = await queryAsync(query, userId);
		return res
			.status(200)
			.json({ success: true, data: results });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ success: false, msg: "Failed to get saved listings" });
	}
};

const removeSavedListing = async (req, res) => {};

module.exports = {
  saveListing, getSavedListings,removeSavedListing
};
