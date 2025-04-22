const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.headers["authorization"];

  // Ensure token exists and is in "Bearer <token>" format
  if (!token || !token.startsWith("Bearer ")) {
    return res.status(403).json({ message: "Access denied, token missing or malformed" });
  }

  const jwtToken = token.split(" ")[1]; // Extract the token part after "Bearer"

  try {
    const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
