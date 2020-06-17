const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ProductSchema = new Schema(
  {
    name: {
      required: true,
      type: String,
      unique: 1,
      maxlength: 100,
    },
    description: {
      required: true,
      type: String,
      maxlength: 1000000,
    },
    price: {
      required: true,
      type: Number,
      maxlength: 255,
    },
    brand: {
      required: true,
      type: mongoose.Schema.Types.ObjectId,
      ref: "brands",
    },
    category: {
      required: true,
      type: mongoose.Schema.Types.ObjectId,
      ref: "categories",
    },
    available: {
      required: true,
      type: Boolean,
    },
    //For BestSelling
    sold: {
      type: Number,
      maxlength: 100,
      default: 0,
    },
    publish: {
      type: Boolean,
      default: true,
    },
    images: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = Product = mongoose.model("products", ProductSchema);
