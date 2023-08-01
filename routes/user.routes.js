const express = require("express");
const {
  index,
  create,
  login,
  logout,
  updatePassword,
} = require("../controllers/user.controller");

const { auth } = require("../utils/utils");

const userRotues = express.Router();

userRotues.get("/", index);
userRotues.post("/", create);
userRotues.post("/login", login);
userRotues.put("/updatepassword", auth, updatePassword);
userRotues.put("/logout", auth, logout);

module.exports = userRotues;
