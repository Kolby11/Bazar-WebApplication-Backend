const database = require("../utils/database");
const authUtils = require("../utils/authUtils");
const util = require("util");

const queryAsync = util.promisify(database.query).bind(database);

const getAllListings = async (req, res) => {
  const from = Number(req.query.from) - 1;
  const to = Number(req.query.to);
  let query = `SELECT * FROM listings`;
  let values = [];
  if (from && to) {
    const limit = to - from;
    query = `SELECT * FROM listings LIMIT ? OFFSET ?`;
    values = [limit, from];
  } else if (from && !to) {
    query = `SELECT * FROM listings LIMIT 100 OFFSET ?`;
    values = [from];
  } else if (to && !from) {
    query = `SELECT * FROM listings LIMIT ?`;
    values = [to];
  }
  try {
    const results = await queryAsync(query, values);
    return res.status(200).json({ success: true, data: results });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, msg: "Failed to retrieve listings" });
  }
};

const createListing = async (req, res) => {
  const sessionStr = req.body.sessionStr;
  const listing = req.body.listing;
  if (!sessionStr) {
    return res.status(401).json({ success: false, msg: "Missing sessionStr" });
  }
  const userId = authUtils.getUserIdWithSessionStr(sessionStr);
  if (!userId) {
    return res
      .status(401)
      .json({ success: false, msg: "User is not logged in" });
  }
  if (listing) {
    const query = `INSERT INTO listings (user_id, name, price, locality, description, category_id) VALUES (?, ?, ?, ?, ?, ?)`;
    const values = [
      userId,
      listing.name,
      listing.price,
      listing.locality,
      listing.description,
      listing.category_id,
    ];
    try {
      const results = await queryAsync(query, values);
      return res
        .status(201)
        .json({
          success: true,
          msg: "Listing created successfully",
          id: results.insertId,
        });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ success: false, msg: "Failed to create listing" });
    }
  } else {
    return res
      .status(400)
      .json({ success: false, msg: "Please provide listing" });
  }
};

const getListing = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ success: false, msg: "ID is not defined" });
  }
  const query = `SELECT * FROM listings WHERE id = ?`;
  try {
    const results = await queryAsync(query, [id]);
    if (results.length === 0) {
      return res
        .status(400)
        .json({ success: false, msg: "Listing with ID does not exist" });
    }
    const viewCountIncreased = await increaseViewCount(id);
    if (viewCountIncreased) {
      return res.status(200).json({ success: true, data: results });
    } else {
      return res
        .status(500)
        .json({
          success: false,
          msg: "Failed to increase view count on listing",
        });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, msg: "Failed to retrieve listing" });
  }
};

const getUserListings = async (req, res) => {
  const userId = req.params.userId;
  if (!userId) {
    return res
      .status(400)
      .json({ success: false, msg: "User ID is not defined" });
  }
  const query = `SELECT * FROM listings WHERE user_id = ?`;
  try {
    const results = await queryAsync(query, [userId]);
    if (results.length === 0) {
      return res
        .status(400)
        .json({ success: false, msg: "User has no listings" });
    }
    return res.status(200).json({ success: true, data: results });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, msg: "Failed to retrieve listings" });
  }
};

const editListing = async (req, res) => {
  const sessionStr = req.body.sessionStr;
  const listingId = req.params.id;
  const listing = req.body.listing;
  const values = [
    listing.name,
    listing.price,
    listing.locality,
    listing.description,
    listing.category_id,
    listingId,
  ];
  if (!sessionStr) {
    return res.status(401).json({ success: false, msg: "Missing sessionStr" });
  }
  if (!(await authUtils.isListingOwner(sessionStr, listingId))) {
    return res
      .status(403)
      .json({ success: false, msg: "User is not the owner of the listing" });
  }
  const query = `UPDATE listings SET name = ?, price = ?, locality = ?, description = ?, category_id = ? WHERE id = ?`;
  try {
    const results = await queryAsync(query, values);
    if (results.affectedRows === 0) {
      return res.status(404).json({ success: false, msg: "Listing not found" });
    }
    return res
      .status(200)
      .json({ success: true, msg: "Listing updated successfully" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, msg: "Failed to update listing" });
  }
};

const deleteListing = async (req, res) => {
  const sessionStr = req.body.sessionStr;
  const listingId = req.params.id;
  if (!sessionStr) {
    return res.status(401).json({ success: false, msg: "Missing sessionStr" });
  }
  if (!(await authUtils.isListingOwner(sessionStr, listingId))) {
    return res
      .status(403)
      .json({ success: false, msg: "User is not the owner of the listing" });
  }
  const query = "DELETE FROM listings WHERE id = ?";
  try {
    const results = await queryAsync(query, [listingId]);
    if (results.affectedRows === 0) {
      return res.status(404).json({ success: false, msg: "Listing not found" });
    }
    return res
      .status(200)
      .json({ success: true, msg: "Listing deleted successfully" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, msg: "Failed to delete listing" });
  }
};

const getFilteredListings = async(req, res) => {
  const filter = req.body;
  const nameValue = `%${req.query.name}%`;
  const values = [nameValue, req.query.category_id, req.query.price];
  const query = "SELECT * FROM listings WHERE name LIKE ? AND category_id = ? AND price <= ?";

  // Add your filter logic and update the query accordingly

  try {
    const results = await queryAsync(query, values);
    if (results.length === 0) {
      return res
        .status(400)
        .json({ success: false, msg: "No listings found" });
    }
    return res.status(200).json({ success: true, data: results });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, msg: "Failed to retrieve listings" });
  }
};

const increaseViewCount = async (id) => {
  const query = `UPDATE listings SET watch_count = watch_count + 1 WHERE id = ?`;
  const values = [id];

  try {
    const results = await queryAsync(query, values);
    if (results.affectedRows === 0) {
      return false; // Return a value to indicate the failure
    }
    return true; // Return a value to indicate the success
  } catch (error) {
    console.error(error);
    return false; // Return a value to indicate the failure
  }
};

module.exports = {
  getAllListings,
  createListing,
  getListing,
  getUserListings,
  editListing,
  deleteListing,
  getFilteredListings,
};
