const HttpError = require("../model/http-error");
const Profile = require("../model/Profile");
const { validationResult } = require("express-validator");
const User = require("../model/User");
const config = require("config");
const request = require("request");
const Post = require("../model/Post");
//! start user profile
const getUserProfile = async (req, res, next) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate("user", ["name", "avatar"]); // the array of what we want from user

    if (!profile) {
      return res.status(400).json({ msg: "There is no profile for this user" });
    }
    res.json(profile.populate("user", ["name", "avatar"]));
  } catch (error) {
    res.status(500).send("Server Error");
  }
};

// ! create user profile
const createProfile = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {
    company,
    website,
    location,
    status,
    skills,
    bio,
    githubusername,
    youtube,
    twitter,
    facebook,
    linkedin,
    instagram,
  } = req.body;
  // build profile  object

  const profileFields = {
    //  we can get the user id from the relation in profile model
    //  user: {
    // type: mongoose.Schema.Types.ObjectId,
    // ref: "user" // connect with the user id in user schema
  };
  profileFields.user = req.user.id;
  if (company) profileFields.company = company;
  if (website) profileFields.website = website;
  if (location) profileFields.location = location;
  if (bio) profileFields.bio = bio;
  if (status) profileFields.status = status;
  if (githubusername) profileFields.githubusername = githubusername;
  //  the skills need to turn into array
  if (skills) {
    profileFields.skills = skills.split(",").map((skill) => skill.trim());
  }

  //   build social object
  profileFields.social = {};
  if (youtube) profileFields.social.youtube = youtube;
  if (twitter) profileFields.social.twitter = twitter;
  if (facebook) profileFields.social.facebook = facebook;
  if (linkedin) profileFields.social.linkedin = linkedin;
  if (instagram) profileFields.social.instagram = instagram;

  try {
    let profile = await Profile.findOne({ user: req.user.id });

    if (profile) {
      //   here need to update the user profile because user alredy has profile
      profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true }
      );
      return res.json(profile);
    }

    //  here profile is not found so create new one
    profile = new Profile(profileFields);
    // save profile
    await profile.save();
    res.json(profile);
  } catch (error) {
    console.log(error);

    res.status(500).send("Server Error");
  }
  res.send("work");
};
//!  End user profile

//! Start Get all user profile
const getAllProfiles = async (req, res, next) => {
  try {
    const profiles = await Profile.find().populate("user", ["name", "avatar"]);
    res.json(profiles);
  } catch (error) {
    console.log(error);

    return next(new HttpError("server error"), 500);
  }
};

//! End all user profile

//! Start getUserProfileById

const getUserProfileById = async (req, res, next) => {
  const userId = req.params.user_id;
  let userFound;
  try {
    userFound = await Profile.findOne({ user: userId }).populate("user", [
      "name",
      "avatar",
    ]);
    if (!userFound) {
      return next(new HttpError("Profile not found", 400));
    }
  } catch (err) {
    if (err.kind == "objectId")
      return next(new HttpError("Profile not found", 500));
    return next(new HttpError("Can not find the user id", 500));
  }
  res.status(201).json(userFound);
};

//! End getUserProfileById

//! Start delete user and profile

const deleteUserAndProfile = async (req, res, next) => {
  try {
    // remove user post you can keep the post
    await Post.deleteMany({ user: req.user.id });
    //   Remove profile
    await Profile.findOneAndRemove({ user: req.user.id }); // it is private and we have access to user id by auth middleware
    // Remove user
    await User.findOneAndRemove({ _id: req.user.id });
    res.json({ message: "User deleted" });
  } catch (error) {
    return next(new HttpError("Error can not delete"));
  }
};

// ! End  delete user and profile

// ! Start add experience
const addExperience = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { title, company, location, from, to, current, description } = req.body;
  const newExp = {
    title,
    company,
    location,
    from,
    to,
    current,
    description,
  };
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    profile.experience.unshift(newExp);
    await profile.save();
    res.json(profile);
  } catch (error) {
    console.log(error);

    res.status(500).send("server error");
  }
};

// ! End add experience

// ! Start delete experience

const deleteExperience = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    // get remove index
    const removeIndex = profile.experience
      .map((item) => item.id)
      .indexOf(req.params.exp_id);
    profile.experience.splice(removeIndex, 1);
    await profile.save();
    res.json(profile);
  } catch (error) {
    res.status(500).json("server error");
  }
};

// ! End delet experience

// ! Start Add education

const addEducation = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const {
    school,
    degree,
    fieldofstudy,
    from,
    to,
    current,
    description,
  } = req.body;

  const newEducation = {
    school,
    degree,
    fieldofstudy,
    from,
    to,
    current,
    description,
  };
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    profile.education.unshift(newEducation);
    await profile.save();
    res.json(profile);
  } catch (error) {
    res.status(500).send("server error");
  }
};
// ! end add education

// ! start delete education
const deleteEducation = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    const removeEdu = profile.education
      .map((edu) => edu.id)
      .indexOf(req.params.edu_id);
    profile.education.splice(removeEdu, 1);
    await profile.save();
    res.json(profile);
  } catch (error) {
    res.status(500);
  }
};

const getUserGithub = async (req, res) => {
  try {
    const option = {
      uri: `https://api.github.com/users/${
        req.params.username
      }/repos?per_page=5&sort=created:asc&client_id=${config.get(
        "githubClientId"
      )}&client_secret=${config.get("githubSecret")}`,
      method: "GET",
      headers: { "user-agent": "node.js" },
    };
    request(option, (error, response, body) => {
      if (error) console.log(error);
      if (response.statusCode !== 200) {
        return res.status(404).json({ message: "No Githup profile found" });
      }

      res.json(JSON.parse(body));
    });
  } catch (error) {
    res.status(500).send("Server error");
  }
};

// ! end delete education

exports.getUserProfile = getUserProfile;
exports.createProfile = createProfile;
exports.getAllProfiles = getAllProfiles;
exports.getUserProfileById = getUserProfileById;
exports.deleteUserAndProfile = deleteUserAndProfile;
exports.addExperience = addExperience;
exports.deleteExperience = deleteExperience;
exports.addEducation = addEducation;
exports.deleteEducation = deleteEducation;
exports.getUserGithub = getUserGithub;
