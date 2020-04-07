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
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, password } = req.body;

  //   check if user exists

  try {
    const existUser = await User.findOne({ email });
    if (existUser) {
      return res.status(400).json({ errors: [{ msg: "User alredy exists" }] });
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
    await user.save();

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
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Signup faild plese try again");
  }
};

exports.createUser = createUser;
