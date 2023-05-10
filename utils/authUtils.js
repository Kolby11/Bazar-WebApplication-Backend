const session=require("../session")
const database=require("../database")

const getUserIdWithSessionUserId = (sessionUserId)=>{
  for(const loggedUserId in session.loggedUsers){
    if(loggedUserId === sessionUserId){
      return loggedUserId
    }
  }
  return 0
}

const isListingOwner = (sessionUserId, listingId)=>{

}
module.exports={getUserIdWithSessionUserId}