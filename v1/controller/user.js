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
    const {name , email , password } = req.body
    
    const userExist = await MODELS.user.findOne({ email })

    if(userExist){
        return res.status(universal.CODES.BAD_REQUEST).send(universal.MESSAGES.USER_ALREADY_EXIST)
    }

      const user = new MODELS.user({
        name,
        email,
        password,
        createdAt: new Date().toISOString()
      });

      const response = await user.save();
    
      if(response){
        res.status(universal.CODES.CREATED).json({
            _id : user._id,
            name : user.name,
            email: user.email,
        })} 
        else {
           return res.status(universal.CODES.NOT_FOUND).send(universal.MESSAGES.USER_DOEST_NOT_EXIST)
        }
    } catch(err) {
      return res.status(universal.CODES.INTERNAL_SERVER_ERROR).send(universal.MESSAGES.INTERNAL_ERROR)
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
