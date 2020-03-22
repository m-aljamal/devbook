const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const auth = require("../middleware/auth");
const User = require("../model/User");
const HttpError = require("../model/http-error");
const config = require("config");
const jwt = require("jsonwebtoken");
const authController = require("../controllers/auth-controller");

// @route GET /api/auth
// @desc
// @access    Public
router.get("/", auth, authController.getUserToken); // auth secound parameter is from middleware folder
// used to return user id from token


// @route POST /api/auth
// @desc       Authenticate user and get token
// @access    Public

router.post(
  "/",
  [ 
    check("email", "Plese include a valid email")
      .isEmail(),
    check("password", 'password is required').exists()
  ],
  authController.login
);





module.exports = router;
