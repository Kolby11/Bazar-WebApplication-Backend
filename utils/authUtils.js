const crypto = require("crypto");
const database = require("./database");

const session = {};

const hashText = (text) => {
   const sha1Hash = crypto.createHash("sha256");
   sha1Hash.update(text);
   const hashedText = sha1Hash.digest("hex");
   return hashedText;
};
//Return user id if user data match
const verifyUser = async (email, pass) => {
   const hashedPass = hashText(pass);
   const values = [email, hashedPass];
   const queryStr = "SELECT id FROM users WHERE email=? AND password=?";
   try {
      const results = database.query(queryStr, values);
      if (results.length > 0) {
         const userId = results[0].id;
         const sessionValues = Object.values(session);
         if (sessionValues.includes(userId)) {
            // User is already logged in
            return undefined;
         }
         return userId;
      } else {
         return undefined;
      }
   } catch (error) {
      console.error(error);
      return undefined;
   }
};

//Returns sessionString if session was created, otherwise returns undefined
const addUserSession = async (email, pass) => {
   try {
      const userId = await verifyUser(email, pass);
      if (userId !== undefined) {
         const tmpStr = `${email}${pass}${new Date().getTime()}`;
         const sessionStr = hashText(tmpStr);
         if (session[sessionStr] === undefined) {
            session[sessionStr] = userId; // Sets userId as the value for sessionStr in sessions
            return sessionStr;
         } else {
            return sessionStr; // Return the session string even if it already exists
            console.log(session);
         }
      }
      return undefined;
   } catch (error) {
      console.error(error);
      return undefined;
   }
};

//Returns true if session was deleted, otherwise returns false
const removeUserSession = async (sessionStr) => {
   try {
      if (session[sessionStr]) {
         delete session[sessionStr];
         console.log(session);
         return true;
      } else {
         return false;
      }
   } catch (error) {
      console.error(error);
      return false;
   }
};

//Return userId if session is found, otherwise returns undefined
const getUserIdWithSessionStr = (sessionStr) => {
   try {
      return session[sessionStr];
   } catch (error) {
      console.error(error);
      return undefined;
   }
};
module.exports = {
   hashText,
   verifyUser,
   addUserSession,
   removeUserSession,
   getUserIdWithSessionStr,
};
