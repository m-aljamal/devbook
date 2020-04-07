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
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ errors: [{ msg: "email is not found, or wrong password" }] });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res
        .status(400)
        .json({ errors: [{ msg: "email is not found, or wrong password" }] });
    }
    const payload = {
      user: {
        id: user.id
      }
    };
    //   check user password

    jwt.sign(
      payload,
      config.get("jwtSecret"),
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        res.json({ token: token });
      }
    );
  } catch (err) {
    return res.status(500).json({
      errors: [{ msg: "Cannot find user with this email " }]
    });
  }
};
exports.getUserToken = getUserToken;
exports.login = login;
