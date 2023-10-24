const express = require("express");
const cors = require("cors");
const { mongodbConnect } = require("./connection");

const app = express();
mongodbConnect();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const followersRoute = require("./routes/followersRoute");
const homeRoute = require("./routes/homeRoute");

app.use("/", followersRoute);
app.use("/", homeRoute);

const PORT = 8000;
app.listen(PORT, () => {
  console.log("Listening");
});
