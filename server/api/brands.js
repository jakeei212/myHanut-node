const express = require("express");
const router = express.Router();

//Load User
const Brands = require("../models/brand");

//Middleware
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

// @route POST api/prduct/brand
// @desc Save new Category
// @access Public
router.post("/brands", auth, admin, (req, res) => {
  const brand = new Brands(req.body);

  brand.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    res.status(200).json({
      success: true,
      brand: doc,
    });
  });
});

// @route GET api/prduct/brand
// @desc Get all Categories
// @access Public
router.get("/brands",(req, res) => {
  Brands.find({}, (err, brands) => {
    //Find and bring everything {}
    if (err) return res.status(400).send(err);
    res.status(200).send(brands);
  });
});

module.exports = router;
