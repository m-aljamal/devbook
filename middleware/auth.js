const jwt = require("jsonwebtoken");
const config = require("config");
const HttpError = require("../model/http-error");
// this function used to protect routes from public to private 
module.exports = function(req, res, next) {
  // get token from header
  const token = req.header("x-auth-token");
  //  check if no token
  if (!token) {
    return next(new HttpError("No token, authorization denied", 401));
  }

  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    req.user = decoded.user; // user is in the payload
    next();
  } catch (err) {
    return next(new HttpError("Token is not valid", 401));
  }
};
