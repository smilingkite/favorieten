const express = require("express");
const mongoose = require("mongoose");
const wishlist = new mongoose.Schema({
  productId: { type: Number },
  aantal: { type: Number },
});

const favoriet = mongoose.model("favoriet", wishlist);
module.exports = favoriet;
