const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/UserModels.js");

exports.generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};
// proection middleware
exports.protect = asyncHandler(async (req, res, next) => {
  let token;
  // check if token exists in headers
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      // verify token and get user id
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // get user id from decoded token
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }
  // if token doesn't exist in headers send error
  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});
