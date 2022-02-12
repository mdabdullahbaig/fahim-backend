const express = require("express");
const {
  signup,
  signin,
  forgetPassword,
} = require("../controllers/userController");

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/forget-password", forgetPassword);

module.exports = router;
