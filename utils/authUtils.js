const session=require("../session")
const database=require("../database")

const getUserIdWithAuthUserId = (authId)=>{
  for(const loggedUserId in session.loggedUsers){
    if(loggedUserId === authId){
      return session.loggedUsers[loggedUserId]
    }
  }
  return 0
}

const isListingOwner = (listingId, userId)=>{
  const query="SELECT * FROM listings WHERE id = ? AND user_id = ?"
  const values=[listingId, userId]
  database.query(query, values, (error, results, fields)=>{
    if (error) {
      console.error(error);
      return false
    }
    if (results.length == 0) {
      return false
    }
    if (results.length == 1) {
      return true
    }
  })
}
module.exports={getUserIdWithAuthUserId, isListingOwner}