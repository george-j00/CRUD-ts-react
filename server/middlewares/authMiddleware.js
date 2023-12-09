const jwt = require("jsonwebtoken");
require("dotenv").config();

const isAuthenticated = async (req, res, next) => {
  let accessToken = req.header("Authorization");

  if (!accessToken) {
    return res.status(403).json({ message: "Access Denied" });
  }
  
  if (accessToken.startsWith("Bearer ")) {
    accessToken = accessToken.slice(7, accessToken.length).trimLeft();
  }
  try {
    // Verify the access accessToken
    const decodedToken = jwt.verify(accessToken, process.env.JWT_SECRET);
    req.user = decodedToken;
    next();
    console.log("Verified user");
  } catch (error) {
    return res.status(401).json({ message: "Token Expired" });
  }
};

module.exports = isAuthenticated;
