const session=require("../session")
const database=require("../database")

const getUserIdWithAuthUserId = (authId)=>{
  for(const loggedUserId in session.loggedUsers){
    if(loggedUserId === authId){
      return loggedUserId
    }
  }
  return 0
}

const isListingOwner = (authId, listingId)=>{

}
module.exports={getUserIdWithAuthUserId}