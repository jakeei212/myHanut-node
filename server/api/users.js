const express = require("express");
const router = express.Router();

//Load User
const User = require("../models/user");
const Product = require("../models/product");
const Payment = require("../models/payment");
//Middleware
const auth = require("../middleware/auth");
const { Mongoose } = require("mongoose");

//for making multiple call for payment success
const async = require("async");

// @route GET api/users/auth
// @desc Route to constly check if user is user
// @access Public
router.get("/auth", auth, (req, res) => {
  res.status(200).json({
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    cart: req.user.cart,
    history: req.user.history,
  });
});

// @route POST api/users/register
// @desc Register User
// @access Public
router.post("/register", (req, res) => {
  const user = new User(req.body);

  user.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    res.status(200).json({
      success: true,
    });
  });
});

// @route POST api/users/login
// @desc Login User
// @access Public
router.post("/login", (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user)
      return res.json({
        loginSuccess: false,
        message: "Auth failes,email not found",
      });

    //Ref to userSchema to this user
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch)
        return res.json({
          loginSuccess: false,
          message: "Wrong password",
        });
      //Function calllback
      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);

        //Set a cookie
        res.cookie("w_auth", user.token).status(200).json({
          loginSuccess: true,
        });
      });
    });
  });
});

// @route GET api/users/logout
// @desc Logoout User
// @access Public
router.get("/logout", auth, (req, res) => {
  User.findOneAndUpdate(
    { _id: req.user._id }, //find user
    { token: "" }, //delete the token
    (err, doc) => {
      //callback function call
      if (err) return res.json({ success: false, err });
      return res.status(200).send({
        success: true,
      });
    }
  );
});

// @route POST api/users/addtocart
// @desc Add product to cart
// @access Private
router.post("/addtocart", auth, (req, res) => {
  User.findOne({ _id: req.user._id }, (err, doc) => {
    let duplicate = false;
    //find product if in cart
    doc.cart.forEach((item) => {
      if (item.id === req.query.productId) {
        duplicate = true;
      }
    });

    if (duplicate) {
      User.findOneAndUpdate(
        {
          _id: req.user._id,
          "cart.id": req.query.productId,
        },
        {
          //inc increment by :1
          $inc: { "cart.$.quantity": 1 },
        },
        {
          //will return all the cart elements of user
          new: true,
        }, //send back the response
        () => {
          if (err) return res.json({ success: false, err });
          res.status(200).json(doc.cart);
        }
      );
    } else {
      User.findOneAndUpdate(
        //find user by id
        { _id: req.user._id },
        {
          //push obj to array
          $push: {
            //push cart
            cart: {
              //create new obj
              id: req.query.productId,
              quantity: 1,
              date: Date.now(),
            },
          },
        }, //get that document back of cart
        { new: true }, //getting it back
        (err, doc) => {
          if (err) return res.json({ success: false, err });
          res.status(200).json(doc.start);
        }
      );
    }
  });
});

// @route GET api/users/removefromcart
// @desc remove item from cart
// @access Private
router.get("/removefromcart", auth, (req, res) => {
  User.findOneAndUpdate(
    { _id: req.user._id },
    {
      $pull: {
        cart: { id: req.query._id },
      },
    },
    { new: true }, //returning the new state
    (err, doc) => {
      let cart = doc.cart;
      let array = cart.map((item) => {
        return item.id;
      });
      Product.find({ _id: { $in: array } })
        .populate("brand")
        .populate("category")
        .exec((err, cartDetail) => {
          return res.status(200).json({
            cartDetail,
            cart,
          });
        });
    }
  );
});

// @route POST api/users/successbuy
// @desc User payed for item
// @access Private
router.post("/successbuy", auth, (req, res) => {
  let history = [];
  let transactionData = {};

  req.body.cartDetail.forEach((item) => {
    history.push({
      dateOfPurchase: Date.now(),
      name: item.name,
      brand: item.brand,
      id: item._id,
      price: item.price,
      quantity: item.quantity,
      paymentId: req.body.paymentData.paymentID,
    });
  });
  transactionData.user = {
    id: req.user._id,
    name: req.user.name,
    lastname: req.user.lastname,
    email: req.user.email,
  };
  transactionData.data = req.body.paymentData;
  transactionData.product = history;

  User.findOneAndUpdate(
    {
      _id: req.user._id,
    },
    {
      $push: { history: history },
      $set: { cart: [] },
    },
    {
      new: true,
    },
    (err, user) => {
      if (err) return res.json({ success: false, err });

      const payment = new Payment(transactionData);
      payment.save((err, doc) => {
        if (err) return res.json({ success: false, err });
        let products = [];
        //
        doc.product.forEach((item) => {
          console.log(item);
          //update result
          products.push({ id: item.id, quantity: item.quantity });
        });
        console.log(products);
        //getting multiple id of products get 3 parameters
        async.eachSeries(products, (item, callback) => {
          Product.updateOne(
            { _id: item.id },
            {
              //increment
              $inc: {
                sold: item.quantity,
              },
            },
            { new: false },
            callback
          );
        });
        {
          (err) => {
            if (err) return res.json({ success: false, err });
            console.log("products");
            res.status(200).json({
              success: true,
              cart: user.cart,
              cartDetail: [],
            });
          };
        }
      });
    }
  );
});

// @route POST api/users/update_profile
// @desc update profile
// @access Private
router.post("/update_profile", auth, (req, res) => {
  User.findOneAndUpdate(
    { _id: req.user._id },
    {
      //update every thing in the body
      $set: req.body,
    },
    { new: true }, //getting the updated data of state
    (err, doc) => {
      if (err) return res.json({ success: false, err });
      return res.status(200).send({
        success: true,
      });
    }
  );
});

module.exports = router;
