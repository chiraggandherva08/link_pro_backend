const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

const PortfolioModel = require("../models/PortfolioModel");

router.get("/follow", async (req, res) => {
  const { nickname } = req.query;
  
});

module.exports = router;
