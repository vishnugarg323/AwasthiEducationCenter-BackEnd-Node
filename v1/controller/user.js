"use strict";

const universal = require("../../constants/index.js");
const MODELS = require("../../models/index");

module.exports = {
  signIn: signIn,
  signUp: signUp
}
// Registration Function
function signUp(req, res, next) {
  async function signUp() {
    try {
      res.send("Registration is Working");
      return;
    } catch(err) {
      next(err);
    }
  }
  signUp().then(function () { });
}

// Login function
function signIn(req, res, next) {
  async function signIn() {
    try {
      return res.send("Login is Working");
    } catch(err) {
      next(err);
    }
  }
  signIn().then(function () { });
}
