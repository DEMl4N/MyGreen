const express = require('express');
const user = require('../../db/models/user');
const asyncHandler = require('express-async-handler');
const sendEmail = require('./sendEmail');

const router = express.Router();

function generateRandomPassword() {
  return Math.floor(Math.random() * 10 ** 8)
    .toString()
    .padStart(8, "0");
}

router.post("/reset-password", asyncHandler(async (req, res, next) => {
  const { email } = req.body;
  const randomPassword = generateRandomPassword();
  await user.model.findOneAndUpdate({ email }, {
    password: getHash(randomPassword),
  });
  await sendEmail(email, "Password Reset", randomPassword);
  res.redirect("/");
}));

module.exports = router;