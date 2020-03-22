const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const userController = require("../controllers/user-controller");

// @route   POST  api/users
// @desc    Register user
// @access  public
router.post(
  "/",
  [
    check("name", "Name is required")
      .not()
      .isEmpty(),
    check("email", "Please include valid email").isEmail(),
    check(
      "password",
      "Please enter password with 6 or more charecters"
    ).isLength({ min: 6 })
  ],
  userController.createUser
);

module.exports = router;
