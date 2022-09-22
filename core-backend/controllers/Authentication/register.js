const express = require("express");
const User = require("../../models/auth/index");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const registerAdmin = async (req, res) => {
  console.log(req.body, "request");
  try {
    const newPassword = await bcrypt.hash(req.body.password, 10);
    await User.create({
      first_name: req.body.first_name,
       last_name: req.body.last_name,
      email: req.body.email,
      password: newPassword,
    });
    res.json({ code: 200, user_detail: {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
        email: req.body.email,
    } });
  } catch (err) {
    res.json({ code: 400, error: "Duplicate email" });
  }
};

module.exports = {
  registerAdmin,
};
