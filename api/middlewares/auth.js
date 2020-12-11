const jwt = require("jsonwebtoken");

// for verifying jwt token
module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.userData = decoded;
    next();
  } catch (error) {
    console.log(req.headers.authorization);
    return res.status(401).json({
      message: "Auth failed",
    });
  }
};
