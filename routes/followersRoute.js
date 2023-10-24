const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

const PortfolioModel = require("../models/PortfolioModel");

async function findFollowers(nickname) {
  return await PortfolioModel.find({ nickname: nickname });
}

router.get("/followers", async (req, res) => {
  const { nickname } = req.query;
  const allfollowers = await findFollowers(nickname);

  if (allfollowers.length === 0) {
    res.json({});
  } else {
    res.json(allfollowers[0].followers);
  }
});

module.exports = router;
