const express = require("express");
const router = express.Router();

//Load Category
const Category = require("../models/category");

//Middleware
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

// @route POST api/product/category
// @desc Save new Category
// @access Private
router.post("/category", auth, admin, (req, res) => {
  const category = new Category(req.body);

  category.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    res.status(200).json({
      success: true,
      category: doc,
    });
  });
});

// @route GET api/product/category
// @desc Get all Categories
// @access Private
router.get("/category", (req, res) => {
  Category.find({}, (err, category) => {
    //Find and bring everything {}
    if (err) return res.status(400).send(err);
    res.status(200).send(category);
  });
});



module.exports = router;
