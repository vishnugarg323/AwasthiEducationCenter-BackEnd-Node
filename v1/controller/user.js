"use strict";

const universal = require("../../constants/index.js");
const MODELS = require("../../models/index");

function getRandom(length) {

  return Math.floor(Math.pow(10, length-1) + Math.random() * 9 * Math.pow(10, length-1));

}

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
    const { email , password } = req.body

    const userEmail = email.toLowerCase().trim()

    const user = await MODELS.user.findOne({ userEmail })
   
    if(user){
        return res.status(universal.CODES.BAD_REQUEST).send(universal.MESSAGES.USER_ALREADY_EXIST)
    }
    
    if(user && user.password === password) {
        user.isActive = true;
        user.sessionId = getRandom(10);
        const updatedUser = await user.save()
        console.log(updatedUser)

        res.json({
            name : updatedUser.name,
            email: updatedUser.email,
            sessionId: updatedUser.sessionId,
            password: updatedUser.password,
            transactionId: updatedUser.transactionId
        })
    }
    else{
      return res.status(universal.CODES.NOT_FOUND).send(universal.MESSAGES.USER_DOEST_NOT_EXIST)
    }
    } catch(err) {
      return res.status(universal.CODES.INTERNAL_SERVER_ERROR).send(universal.MESSAGES.INTERNAL_ERROR)    
    }
  }
  signIn().then(function () { });
}
