const database=require("../database")

//getting all listings
const getAllListings = (req, res) => {
  const { limit } = req.query;
  let query = `SELECT * FROM listings`;
  const values = [];
  if (limit) {
    query = `SELECT * FROM listings LIMIT ?`;
    values.push(parseInt(limit));
  }
  database.query(query, values, (error, results, fields) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ success: false, msg: "Failed to retrieve listings" });
    }
    return res.status(200).json({ success: true, data: results });
  });
};


//create listing
const createListing = (req, res) => {
  const listing = req.body;
  if (listing) {
    const query = `INSERT INTO listings (user_id, name, price, locality, description, watch_count, category_id) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    const values = [
      listing.user_id,
      listing.name,
      listing.price,
      listing.locality,
      listing.description,
      listing.watch_count,
      listing.category_id
    ];
    database.query(query, values, (error, results, fields) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ success: false, msg: "Failed to create listing" });
      }
      return res.status(201).json({ success: true, msg: "Listing created successfully", id: results.insertId });
    });
  } else {
    return res.status(400).json({ success: false, msg: "Please provide listing" });
  }
};

//get single listing
const getListing = (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ success: false, msg: "ID is not defined" });
  }
  const query = `SELECT * FROM listings WHERE id = ?`;
  database.query(query, [id], (error, results, fields) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ success: false, msg: "Failed to retrieve listing" });
    }
    if (results.length === 0) {
      return res.status(400).json({ success: false, msg: "Listing with ID does not exist" });
    }
    return res.status(200).json({ success: true, data: results });
  });
};

//get listings by user
const getUserListings = (req, res) => {
  const { userId } = req.params;
  if (!userId) {
    return res.status(400).json({ success: false, msg: "User ID is not defined" });
  }
  const query = `SELECT * FROM listings WHERE user_id = ?`;
  database.query(query, [userId], (error, results, fields) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ success: false, msg: "Failed to retrieve listings" });
    }
    if (results.length === 0) {
      return res.status(400).json({ success: false, msg: "User has no listings" });
    }
    return res.status(200).json({ success: true, data: results });
  });
};

//edit listing
const editListing = (req, res) => {
  const id = req.params.id;
  const { name, price, locality, description, category_id } = req.body;
  const query = `UPDATE listings SET name = ?, price = ?, locality = ?, description = ?, category_id = ? WHERE id = ?`;
  database.query(query, [name, price, locality, description, category_id, id], (error, results, fields) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ success: false, msg: "Failed to update listing" });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ success: false, msg: "Listing not found" });
    }
    return res.status(200).json({ success: true, msg: "Listing updated successfully" });
  });
};

//delete listing
const deleteListing = (req, res) => {
  const id = req.params.id;
  const query = `DELETE FROM listings WHERE id = ${id}`;
  database.query(query, id, (error, results, fields) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ success: false, msg: "Failed to delete listing" });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ success: false, msg: "Listing not found" });
    }
    return res.status(200).json({ success: true, msg: "Listing deleted successfully" });
  });
};

module.exports={
    getAllListings, createListing, getListing, getUserListings, editListing, deleteListing
}