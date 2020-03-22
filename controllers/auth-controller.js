const HttpError = require("../model/http-error");
const config = require("config");
const jwt = require("jsonwebtoken");
const User = require("../model/User");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const getUserToken = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select("-password"); // req.user comes from auth middleware
    res.json(user);
  } catch (err) {
    return next(new HttpError("Something wrong plese try again", 500));
  }
};

const login = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError(
        "invalid inputs passed, plese check your data and try again",
        500
      )
    );
  }
  const { email, password } = req.body;
  let user;
  try {
    user = await User.findOne({ email });
  } catch (err) {
    return next(new HttpError("Cannot find user with this email ", 500));
  }

  if (!user) {
    return next(new HttpError("email is not found, or wrong password", 401));
  }

  //   check user password
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return next(new HttpError("email is not found, or wrong password", 401));
  }
  const payload = {
    user: {
      id: user.id
    }
  };
  jwt.sign(
    payload,
    config.get("jwtSecret"),
    { expiresIn: 360000 },
    (err, token) => {
      if (err) throw err;
      res.json({ token: token });
    }
  );
  // res.status(200).json({ token });
};
exports.getUserToken = getUserToken;
exports.login = login;
