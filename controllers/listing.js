const database=require("../database")
const authUtils=require("../utils/authUtils")

//getting all listings
const getAllListings = (req, res) => {
  const from = Number(req.query.from)-1;
  const to = Number(req.query.to);
  let query = `SELECT * FROM listings`;
  let values=[]
  if (from && to) {
    limit=to-from
    query = `SELECT * FROM listings LIMIT ? OFFSET ?`;
    values=[limit, from];
  }
  else if(from && !to){
    query = `SELECT * FROM listings LIMIT 100 OFFSET ?`;
    values=[from];
  }
  else if(to && !from){
    query = `SELECT * FROM listings LIMIT ? `;
    values=[to];
  }abase.query(query, values, (error, results, fields) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ success: false, msg: "Failed to retrieve listings" });
    }
    return res.status(200).json({ success: true, data: results });
  });
};


//create listing
const createListing = (req, res) => {
  const authId=req.body.authId;
  const listing = req.body.listing;
  if(!authId){
    return res.status(401).json({success: false, msg: "Missing authId"})
  }
  userId=authUtils.getUserIdWithAuthUserId(authId)
  if(userId==0){
    return res.status(401).json({success: false, msg: "User is not logged in"})
  }
  if (listing) {
    const query = `INSERT INTO listings (user_id, name, price, locality, description, category_id) VALUES (?, ?, ?, ?, ?, ?)`;
    const values = [
      userId,
      listing.name,
      listing.price,
      listing.locality,
      listing.description,
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
  const authId=req.body.authId;
  const listingId = req.params.id;
  const listing = req.body.listing;
  const values = [
    listing.name, 
    listing.price, 
    listing.locality, 
    listing.description, 
    listing.category_id, 
    listingId
  ]
  if(!authId){
    return res.status(401).json({success: false, msg: "Missing authId"})
  }
  const userId=authUtils.getUserIdWithAuthUserId(authId)
  if(userId==0){
    return res.status(401).json({success: false, msg: "User is not logged in"})
  }
  if(authUtils.isListingOwner(listingId, userId)==false){
    return res.status(403).json({success: false, msg: "User is not owner of the listing"})
  }
  const query = `UPDATE listings SET name = ?, price = ?, locality = ?, description = ?, category_id = ? WHERE id = ?`;
  database.query(query, values , (error, results, fields) => {
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
  const authId = req.body.authId
  const listingId = req.params.id
  if(!authId){
    return res.status(401).json({success: false, msg: "Missing authId"})
  }
  const userId=authUtils.getUserIdWithAuthUserId(authId)
  if(userId==0){
    return res.status(401).json({success: false, msg: "User is not logged in"})
  }
  if(authUtils.isListingOwner(listingId, userId)==false){
    return res.status(403).json({success: false, msg: "User is not owner of the listing"})
  }
  const query = "DELETE FROM listings WHERE id = ?";
  database.query(query, [listingId], (error, results, fields) => {
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

const getFilteredListings=(req, res)=>{
  filter=req.body
  query="SELECT * FROM LI"
}

module.exports={
    getAllListings, createListing, getListing, getUserListings, editListing, deleteListing, getFilteredListings
}