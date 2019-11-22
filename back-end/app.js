// Reading .env
require('dotenv').config();

// Dependencies
const bodyParser = require("body-parser");
const compression = require("compression");
const cors = require("cors");
const createError = require("http-errors");
const express = require("express");
const logger = require("morgan");
const path = require("path");

const app = express();

// Routes
const mainRouter = require("./routes/index");

// Configuring CORS
app.use(cors());
app.options("*", cors());

// Configuring jade
app.set("views", path.join(__dirname, "routes/views"));
app.set("view engine", "jade");

// Configuring body-parser
app.use(bodyParser.json({
  limit: "50mb"
}));
app.use(bodyParser.urlencoded({
  limit: "50mb",
  extended: true
}));

// Starting compression
app.use(compression());

// Setting logs
app.use(logger("dev"));

// Configuring express
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({
  extended: false
}));

// Setting timeout
app.use(function (req, res, next) {
  res.setTimeout(30000, function () {
    console.info("Request has timed out.");
    res.status(503).json({
      error: true,
      errorMessage: "Timed out."
    });
  });

  next();
});

// Declaring routes
app.use("/", mainRouter);

// Handling errors on 404
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {

  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  console.error({
    err
  });

  res.status(err.status || 500);
  res.render("error");
});

// Starting headers
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, Content-Type, X-Auth-Token"
  );
  next();
});

// Listening server
const listener = app.listen(process.env.PORT, function () {
    console.info(`Server running on the port ${process.env.PORT}`);
  })
  .on("error", function (err) {
    console.info("on error handler");
    console.info(err);
  });

process.on("uncaughtException", function (err) {
  console.info("process.on handler");
  console.info(err);
});

module.exports = listener;