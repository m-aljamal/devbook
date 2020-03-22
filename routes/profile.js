const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const auth = require("../middleware/auth"); // auth is used for every private routes

const profileControler = require("../controllers/profile-controler");
// @route        GET api/profile/me
// @desc         GET current users profile
// @access       Private
router.get("/me", auth, profileControler.getUserProfile);

// @route        POST api/profile/
// @desc         Create or update user profile
// @access       Private

router.post(
  "/",
  [
    auth,
    [
      check("status", "Status is required")
        .not()
        .isEmail(),
      check("skills", "Skills is required")
        .not()
        .isEmpty()
    ]
  ],
  profileControler.createProfile
);

// @route        GET api/profile/
// @desc         Get all profiles
// @access       public

router.get("/", profileControler.getAllProfiles);

// @route        GET api/profile/user/user_id
// @desc         Get user profile
// @access       public
router.get("/user/:user_id", profileControler.getUserProfileById);

// @route        DELETE api/profile
// @desc         Delete user, profile and posts
// @access       private
router.delete("/", auth, profileControler.deleteUserAndProfile);

// @route        PUT api/profile/experience
// @desc         add profile experience
// @access       private
router.put(
  "/experience",
  [
    auth,
    [
      check("title", "title is required")
        .not()
        .isEmpty(),
      check("company", "Company is required")
        .not()
        .isEmpty(),
      check("from", "Form is required")
        .not()
        .isEmpty()
    ]
  ],
  profileControler.addExperience
);

// @route        DELETE api/profile/experience/exp_id
// @desc         Delete experience
// @access       private
router.delete("/experience/:exp_id", auth, profileControler.deleteExperience);

// @route        PUT api/profile/experience
// @desc         add profile experience
// @access       private
router.put("/education", [
  auth,
  [
    check("school", "school is required")
      .not()
      .notEmpty(),
    check("degree", "degree is required")
      .not()
      .isEmpty(),
    check("fieldofstudy", "field of study is required")
      .not()
      .isEmpty(),
    check("from", "from is required")
      .not()
      .isEmpty()
  ]
], profileControler.addEducation);

// @route        DELETE api/profile/education/edu_id
// @desc         Delete education
// @access       private
router.delete("/education/:edu_id", auth, profileControler.deleteEducation);

// @route        GET api/profile/githup/:username
// @desc         Get user repos from Githup
// @access       public

router.get('/githup/:username', profileControler.getUserGithub)

module.exports = router;
