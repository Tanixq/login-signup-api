require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const db = require("./api/config/config");
const apiRoutes = require("./api/routes/user");

const app = express();

// app use
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

// database connection
mongoose.Promise = global.Promise;
mongoose.connect(
  db.DATABASE,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) console.log(err);
    console.log("database is connected");
  }
);

// home route handler
app.get("/", (req, res) => {
  res
    .status(200)
    .send(`Welcome to login and sign-up API for Usage Visit Github ...`);
});

// api route handler
app.use("/api", apiRoutes);

//The 404 Route
app.get("*", (req, res) => {
  res
    .status(404)
    .send("Looking for something that is not here. Check URL or Method");
});

// listening port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App is listening at ${PORT}`);
});
