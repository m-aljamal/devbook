const User = require("../model/User");
const { validationResult } = require("express-validator");
const HttpError = require("../model/http-error");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

// Register new user
const createUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    return next(
      new HttpError(
        "invalid inputs passed, plese check your data and try again",
        500
      )
    );
  }

  const { name, email, password } = req.body;

  //   check if user exists
  let existUser;

  try {
    existUser = await User.findOne({ email });
  } catch (err) {
    return next(new HttpError("Signup faild plese try again", 500));
  }

  if (existUser) {
    return next(
      new HttpError("User is already exists, please login instead", 422)
    );
  }
  //   create avatar for user
  const avatar = gravatar.url(email, {
    s: "200",
    r: "pg",
    d: "mm"
  });

  //   create new user

  const user = new User({
    name,
    email,
    password,
    avatar
  });
  //   Encrypt password
  const salt = await bcrypt.genSalt(10); // 10 is rcomanded
  user.password = await bcrypt.hash(password, salt);

  try {
    await user.save();
    //
    const payload = {
      user: {
        id: user.id
      }
    };
    jwt.sign(
      payload,
      config.get("jwtSecret"),
      { expiresIn: 36000 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    ); // sign takes payload and secrit saved in config json

    res.status(201).json({ token });
  } catch (err) {
    return next(new HttpError("faild to create user, plese tru again", 500));
  }
};

exports.createUser = createUser;
