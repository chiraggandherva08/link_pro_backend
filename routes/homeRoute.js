const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");

const portfolioSchema = new mongoose.Schema({
  nickname: { type: String, required: true, unique: true },
  css: { type: Object, required: false, unique: false },
  links: { type: Object, required: true, unique: false },
  photo: { type: String, required: true, unique: false },
  fname: { type: String, required: true, unique: false },
  lname: { type: String, required: true, unique: false },
  bio: { type: String, required: false, unique: false },
  visiblity: { type: String, required: true, unique: false },
  projects: { type: Object, required: false, unique: false },
});

const PortfolioModel = mongoose.model(`portfolio`, portfolioSchema);

async function findPortData(id) {
  return await PortfolioModel.find({ nickname: id });
}

async function updatePortData(data) {
  console.log(data);

  const result = await PortfolioModel.updateOne(
    { nickname: data.nickname },
    { $set: data }
  );

  if (result.nModified === 1) {
    return "Success";
  } else {
    return "No document found to update";
  }
}

async function createPortData(data) {
  const result = await PortfolioModel.create(data);

  if (result.length === 1) {
    return "Success";
  } else {
    return "Failed";
  }
}

async function getAllPortfolios() {
  return await PortfolioModel.find({visiblity: "public"});
}

router.get("/:id", async (req, res) => {
  const id = req.params.id;

  const { nickname, photo, fname, lname, email } = req.query;
  const result = await findPortData(id);

  if (result.length === 0) {
    if (
      nickname === undefined ||
      photo === undefined ||
      fname === undefined ||
      lname === undefined ||
      email === undefined
    ) {
      return res.json({ id: [] });
    }

    await createPortData({
      nickname: nickname,
      css: {},
      links: {
        email: email,
      },
      photo: photo,
      fname: fname,
      lname: lname,
      bio: "--",
      visiblity: "public",
      projects: {},
    });

    const result = await findPortData(id);

    return res.json({
      id: result,
    });
  }

  return res.json({
    id: result,
  });
});

router.get("/", async (req, res) => {
  return res.json(await getAllPortfolios());
});

router.post("/:id", async (req, res) => {
  const id = req.params.id;
  const reqdata = req.body.data;

  const resp = await updatePortData(reqdata);

  return res.json({
    response: resp,
  });
});

module.exports = router;
