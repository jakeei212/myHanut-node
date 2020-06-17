const User = require("../models/user");

let auth = (req, res, next) => {
  ///If user not allowed process will be stopped here

  let token = req.cookies.w_auth; //Grabbing the cookie

  User.findByToken(token, (err, user) => {
    if (err) throw err;
    if (!user)
      return res.json({
        isAuth: false,
        error: true,
      });
    req.token = token;
    req.user = user;
    next();
  });
};

module.exports = auth;
