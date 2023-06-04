const crypto = require("crypto");
const util = require("util");
const database = require("./database");

const session = {};
const queryAsync = util.promisify(database.query).bind(database);

const hashText = (text) => {
   const sha1Hash = crypto.createHash("sha256");
   sha1Hash.update(text);
   const hashedText = sha1Hash.digest("hex");
   return hashedText;
};

const verifyUser = async (email, pass) => {
   const hashedPass = hashText(pass);
   const values = [email, hashedPass];
   const queryStr = "SELECT id FROM users WHERE email=? AND password=?";
   try {
      const results = await queryAsync(queryStr, values);
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

const addUserSession = async (email, pass) => {
   try {
      const userId = await verifyUser(email, pass);
      if (userId !== undefined) {
         const tmpStr = `${email}${pass}${new Date().getTime()}`;
         const sessionStr = hashText(tmpStr);
         if (session[sessionStr] === undefined) {
            session[sessionStr] = userId;
            return sessionStr;
         } else {
            return undefined;
         }
      }
   } catch (error) {
      console.error(error);
      return undefined;
   }
};

const removeUserSession = (sessionStr) => {
   try {
      if (session[sessionStr]) {
         delete session[sessionStr];
         return true;
      } else {
         return false;
      }
   } catch (error) {
      console.error(error);
      return false;
   }
};

const getUserIdWithSessionStr = (sessionStr) => {
   try {
      const userId = session[sessionStr];
      return userId;
   } catch (error) {
      console.error(error);
      return undefined;
   }
};

const isListingOwner = async (sessionStr, listingId) => {
   const userId = getUserIdWithSessionStr(sessionStr);
   const queryStr = "SELECT user_id FROM listings WHERE id=?";
   try {
      if (results.length > 0) {
         if (userId === results[0].user_id) {
            return true;
         }
         return false;
      } else {
         return false;
      }
   } catch (error) {
      console.error(error);
      return false;
   }
};
module.exports = {
   hashText,
   verifyUser,
   addUserSession,
   removeUserSession,
   getUserIdWithSessionStr,
   isListingOwner,
};
