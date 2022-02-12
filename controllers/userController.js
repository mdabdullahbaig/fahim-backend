const User = require("../models/userModel");

const signup = async (req, res, next) => {
  const { email, password, secret } = req.body;

  let existedUser;
  try {
    existedUser = await User.findOne({ email });
  } catch (err) {
    return next(new Error("Internal Server Error"));
  }

  if (existedUser) {
    const error = new Error(`User already exist with this ${email}`);
    return next(error);
  }

  const user = new User({
    email,
    password,
    secret,
  });

  try {
    await user.save();
  } catch (err) {
    return next(err);
  }

  res.status(201).json(user);
};

const signin = async (req, res, next) => {
  const { email, password } = req.body;

  let existedUser;
  try {
    existedUser = await User.findOne({ email, password });
  } catch (err) {
    return next(new Error("Internal Server Error"));
  }

  if (!existedUser) {
    const error = new Error("Invalid credentials.");
    return next(error);
  }

  res.status(200).json(existedUser);
};

const forgetPassword = async (req, res, next) => {
  const { email, secret } = req.body;

  let existedUser;
  try {
    existedUser = await User.findOne({ email, secret });
  } catch (err) {
    return next(new Error("Internal Server Error"));
  }

  if (!existedUser) {
    const error = new Error(`User does not exist with this ${email}`);
    return next(error);
  }

  res.status(200).json({ password: existedUser.password });
};

exports.signup = signup;
exports.signin = signin;
exports.forgetPassword = forgetPassword;
