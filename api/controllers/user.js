const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const salt = 10;
const config = require("../config/config");

exports.user_signup = function (req, res, next) {
  // check if email already exists or not
  User.findOne({ email: req.body.email }, (err, found) => {
    // if error handle
    if (err) {
      return res.status(500).json({
        error: err,
      });
    }
    // if email found then return email already registered
    else if (found) {
      return res.status(409).json({
        message: "Email already registered.",
      });
      // if email is not found in database
    } else {
      // hashing user password
      bcrypt.hash(req.body.password, salt, (err, hash) => {
        // if err handle it
        if (err) {
          return res.status(500).json({
            error: err,
          });
        }
        // if no error
        else {
          // creating new user from data received from body
          const newUser = new User({
            email: req.body.email,
            name: req.body.name,
            phone_number: req.body.phone_number,
            dob: req.body.dob,
            password: hash,
          });
          // saving new user
          newUser
            .save()
            .then((result) =>
              res.status(201).json({
                message: "Sign Up Successful",
              })
            )
            .catch((err) => {
              console.log(err);
              res.status(500).json({ error: err });
            });
        }
      });
    }
  });
};

exports.login = (req, res, next) => {
  // search email in database
  User.findOne({ email: req.body.email }, (err, foundUser) => {
    //   if err return 500
    if (err) {
      return res.status(500).json({
        error: err,
      });
    }
    // if user not found responsing Auth Fail
    else if (!foundUser) {
      return res.status(401).json({
        message: "Authentication Failed Check Email or Password!",
      });
    }
    // if user found
    else {
      // comparing password from database
      bcrypt.compare(req.body.password, foundUser.password, (err, matched) => {
        //   if err return 500
        if (err) {
          return res.status(500).json({
            error: err,
          });
        }
        // if password not matched response Auth fail
        else if (!matched) {
          return res.status(401).json({
            message: "Authentication Failed Check Email or Password!",
          });
        }
        // if password matched
        else {
          // generating jwt token
          const token = jwt.sign(
            {
              email: foundUser.email,
              userId: foundUser._id,
            },
            config.JWT_KEY,
            {
              expiresIn: 3600,
            }
          );
          //   returning Auth success and token
          return res.status(200).json({
            message: "Authentication Succesfull",
            tokenExpiry: "Token is only valid for 1 Hour",
            token: token,
          });
        }
      });
    }
  });
};

exports.get_all_user = (req, res, next) => {
  // finding all users in database
  User.find({}, (err, result) => {
    //   if err return 500
    if (err) {
      return res.status(500).json({
        error: err,
      });
    }
    // if users found
    if (result) {
      // storing them in object called users
      var users = {};
      // iterate through result Array.
      // storing all resulted user in users Object created above,
      // in which Object id of every user is key and object with there details nested inside.
      result.forEach((eachUser) => {
        users[eachUser._id] = {
          email: eachUser.email,
          name: eachUser.name,
          phone_number: eachUser.phone_number,
          dob: eachUser.dob,
        };
      });
      //  returning users object as all_users
      return res.status(200).json({
        all_users: users,
      });
    }
    // if no result return
    if (!result) {
      return res.status(201).json({
        message: "no users found",
      });
    }
  });
};
