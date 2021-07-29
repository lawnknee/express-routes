
const express = require("express");

const db = require("./fakeDb");
const router = new express.Router();


/** GET /items: get list of items */
router.get("/", function (req, res, next) {
    return res.json(db.Item.all());
  });