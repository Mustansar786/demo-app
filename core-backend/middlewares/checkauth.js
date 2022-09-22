const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.auth;
    const decoded = jwt.verify(token, "secret123");
    req.userData = decoded;
    next();
  } catch {
    return res.status(401).json({
      message: "Authentication Failed",
    });
  }
};
