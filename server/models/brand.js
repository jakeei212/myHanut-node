const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//Configure Schema
const BrandsSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: 1,
    maxlength: 100,
  },
});

module.exports = Brands = mongoose.model("brands", BrandsSchema);
