const express = require("express");
const mongoose = require("mongoose");

const Favoriet = require("../model/favoriet");
const router = express.Router();

router.get("/api/v1/favorieten", async (req, res) => {
  try {
    const favorieten = await Favoriet.find({});
    res.send(favorieten);
  } catch (err) {
    console.error(err);

    res.status(500).send(err);
  }
});

router.post("/api/v1/favorieten", async (req, res) => {
  try {
    const favorietObject = new Favoriet({
      productId: req.body.productId,
      aantal: req.body.aantal,
    });
    const favoriet = await favorietObject.save();
    res.send(favoriet);
  } catch (err) {
    console.error(err);

    res.status(500).send(err);
  }
});

router.put("/api/v1/favorieten/:productId", async (req, res) => {
  try {
    const id = Number(req.params.productId);
    const query = { productId: id };

    const favorietObject = await Favoriet.updateOne(query, req.body);
    res.send(favorietObject);
  } catch (err) {
    console.error(err);

    res.status(500).send(err);
  }
});

router.delete("/api/v1/favorieten/:productId", async (req, res) => {
  try {
    const id = Number(req.params.productId);
    const stdquery = { productId: id };

    const favorietObject = await Favoriet.deleteOne(stdquery, req.body);
    res.send(favorietObject);
  } catch (err) {
    console.error(err);

    res.status(500).send(err);
  }
});

module.exports = router;
