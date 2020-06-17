const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SALT_I = 10;
const Keys = require("../config/keys");

const Schema = mongoose.Schema;

//Configure Schema
const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    trim: true, //no white space
    unique: 1,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
  },
  name: {
    type: String,
    required: true,
    maxlength: 100,
  },
  lastname: {
    type: String,
    required: true,
    maxlength: 100,
  },
  cart: {
    type: Array,
    default: [],
  },
  history: {
    type: Array,
    default: [],
  },
  role: {
    type: Number,
    default: 0,
  },
  token: {
    type: String,
  },
});

//BEFORE saving the schema
UserSchema.pre("save", function (next) {
  //Refer to this user
  var user = this;

  //Hash the password if trying to change password
  if (user.isModified("password")) {
    bcrypt.genSalt(SALT_I, function (err, salt) {
      //Next kills if err
      if (err) return next(err);

      //Storing password as hash
      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

//***Compare password function
UserSchema.methods.comparePassword = function (candidatePassword, callBack) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    //function (err, isMatch) from api
    if (err) return callBack(err);
    callBack(null, isMatch);
  });
};

//***GenerateToken function
UserSchema.methods.generateToken = function (callBack) {
  var user = this;
  //Generate token takes user.id + password
  var token = jwt.sign(user._id.toHexString(), Keys.superSecret);

  user.token = token;
  user.save(function (err, user) {
    if (err) return callBack(err);
    callBack(null, user);
  });
};

//***Static custom mehod
UserSchema.statics.findByToken = function (token, callBack) {
  var user = this;
  //Virife the toke
  jwt.verify(token, Keys.superSecret, function (err, decode) {
    user.findOne({ _id: decode, token: token }, function (err, user) {
      if (err) return callBack(err);
      callBack(null, user);
    });
  });
};

module.exports = User = mongoose.model("user", UserSchema);
