const jwt = require("jsonwebtoken");
require("dotenv").config();
const secretKey = process.env.secretKey;

//verify token function
function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, secretKey);
    return decoded; // Return the decoded payload
  } catch (error) {
    return null; // Token verification failed
  }
}

// a route that can be used on other routres to check the token before
//the actual route function start

function protectRoute(req, resp, next) {
  const token = req.headers.authorization?.split(" ")[1]; // Get token from Authorization header

  if (!token) {
    return resp.status(401).json({ message: "Token not provided" });
  }

  const decodedToken = verifyToken(token);

  if (decodedToken) {
    next(); // Proceed to the next middleware/route handler
  } else {
    return resp.status(401).json({ message: "Invalid token or token expired" });
  }
}

module.exports = {
  verifyToken,
  protectRoute,
};
