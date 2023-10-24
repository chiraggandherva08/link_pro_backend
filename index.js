const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config({ path: "./.env" });

const url = process.env.CONNECTION_URL;

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to db..."))
  .catch((err) => console.log("Error", err));

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

const homeRoute = require("./routes/homeRoute");
app.use("/", homeRoute);

app.use("/", homeRoute);

const PORT = 8000;
app.listen(PORT, () => {
  console.log("Listening");
});
