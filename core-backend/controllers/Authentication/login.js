const express = require("express");
const User = require("../../models/auth/index");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const loginAdmin = async (req, res) => {
  const user = await User.findOne({
    email: req.body.email,
  });

  if (!user) {
    return { code: 404, error: "Invalid login" };
  }

  const isPasswordValid = await bcrypt.compare(
    req.body.password,
    user.password
  );

  if (isPasswordValid) {
    const token = jwt.sign(
      {
        first_name: user.first_name,
      last_name: user.last_name,
        email: user.email,
      },
      "secret123"
    );

    return res.json({ code: 200, user: token, detail: {
      first_name: user.first_name,
      last_name: user.last_name,
        email: user.email
    } });
  } else {
    return res.json({ code: 400, user: "Invalid Credential" });
  }
};

module.exports = {
  loginAdmin,
};
