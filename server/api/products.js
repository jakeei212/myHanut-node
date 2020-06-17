const express = require("express");
const router = express.Router();
const { Mongoose } = require("mongoose");

//Images upload
//images upload help the req get the files
const formidable = require("express-formidable");
//Clodinary account
const cloudinary = require("cloudinary");
const Keys = require("../config/keys");

//Config cloudinary
cloudinary.config({
  cloud_name: Keys.cloudinaryCloudName,
  api_key: Keys.cloudinaryApiKey,
  api_secret: Keys.cloudinaryApiSecret,
});

//Load User
const Product = require("../models/product");

//Middleware
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

// @route POST api/product/article
// @desc Create new Product
// @access Public
router.post("/article", auth, (req, res) => {
  const product = new Product(req.body);

  product.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    res.status(200).json({
      success: true,
      article: doc,
    });
  });
});

// @route GET api/product/article/?id=itemID1,itemID2,itemID3,itemID4
// @desc Search by IDS
// @access Public
router.get("/articles_by_id", (req, res) => {
  let type = req.query.type;
  let items = req.query.id;
  //Checking if type has IDs or ID
  if (type === "array") {
    //Split the IDs
    let ids = req.query.id.split(",");
    items = []; //Items IDs
    items = ids.map((item) => {
      //Converting ids to obj
      return item;
    });
  }
  //items are single id or many
  Product.find({ _id: { $in: items } })
    //Make a relationship Instead Id we get the name of category
    .populate("brand")
    .populate("category")
    //Execute the callback
    .exec((err, docs) => {
      return res.status(200).send(docs);
    });
});

// @route GET api/product/sortBy=createdAt&order=desc&limit=4
// @desc Get the 4 newest products
// @access Public

// @route GET api/product/sortBy=sold&order=desc&limit=100&skip=5
// @desc Get the 4 most sold products
// @access Public
router.get("/articles", (req, res) => {
  let order = req.query.order ? req.query.order : "asc";
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
  let limit = req.query.limit ? parseInt(req.query.limit) : 100;
  //items are single id or many
  Product.find()
    //Instead Id we get the name of category
    .populate("brand")
    .populate("category")
    //Sort by
    .sort([[sortBy, order]])
    //Limit
    .limit(limit)
    //Execute the callback
    .exec((err, docs) => {
      if (err) return res.status(400).send(err);
      return res.status(200).send(docs);
    });
});

// @route POST api/product/shop
// @desc POST all by filters
// @access Public
router.post("/shop", (req, res) => {
  let order = req.body.order ? req.body.order : "desc";
  let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
  let limit = req.body.limit ? parseInt(req.body.limit) : 100;
  let skip = parseInt(req.body.skip);
  //obj to mongo
  let findArgs = {};

  for (let key in req.body.filters) {
    //check if filters empty
    if (req.body.filters[key].length > 0) {
      if (key === "price") {
        //converting the array of price between to array with key
        findArgs[key] = {
          //gt=greater then
          $gte: req.body.filters[key][0],
          //lt=greater then
          $lte: req.body.filters[key][1],
        };

        if (key === "frets") {
          findArgs[key] = findArgs[key] = req.body.filters[key];
        }
      } else {
        //default case would be frets,brand,category
        findArgs[key] = req.body.filters[key];
      }
    }
  }

  findArgs["publish"] = true;
  //find by filters
  Product.find(findArgs)
    .populate("brand")
    .populate("category")
    .sort([[sortBy, order]])
    .skip(skip)
    .limit(limit)
    .exec((err, articles) => {
      if (err) return res.status(400).send(err);
      res.status(200).json({
        size: articles.length, //how many articles we return
        articles,
      });
    });
});

// @route POST api/product/shop
// @desc POST all by filters
// @access Private
router.post("/uploadimage", auth, admin, formidable(), (req, res) => {
  cloudinary.uploader.upload(
    req.files.file.path,
    (result) => {
      //callback
      console.log(result);
      res.status(200).send({
        public_id: result.public_id,
        url: result.url,
      });
    },
    {
      //image id
      public_id: `${Date.now()}`,
      //file type
      resource_type: "auto",
    }
  );
});

// @route GET api/product/removeimage?public_id
// @desc GET Delete image by id
// @access Private
router.get("/removeimage", auth, admin, (req, res) => {
  let image_id = req.query.public_id;

  cloudinary.uploader.destroy(image_id, (error, result) => {
    if (error) return res.json({ success: false, error });
    res.status(200).send("ok");
  });
});

module.exports = router;
