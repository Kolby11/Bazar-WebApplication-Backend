const session=require("../session")
const database=require("../database")


const createUserAuth = (userId) => {
  let identifier = "";
  for (let i = 1; i < 5; i++) {
    const randomNumberStr = Math.floor(Math.random() * 10).toString();
    identifier += randomNumberStr;
  }
  if (!(identifier in session.loggedUsers)) {
    return identifier;
  } else {
    return createUserAuth(userId);
  }
};

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

const isUserOwner = (authId, id)=>{
  const tmpId=getUserIdWithAuthUserId(authId)
  if (tmpId==id){return true}
  return false
}

const isUserLoggedIn = (id) => {
  for (const authId in session.loggedUsers){
    if (session.loggedUsers[authId] === userId) {
      console.log(session.loggedUsers, authId, id)
      return true}
  return false
  }
}
module.exports={createUserAuth, getUserIdWithAuthUserId, isListingOwner, isUserOwner, isUserLoggedIn}