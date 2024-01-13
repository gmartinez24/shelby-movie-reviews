const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
// const ExpressError = require("../utils/ExpressError");
// const MovieReview = require("../models/movieReview");
// const axios = require("axios");
const { isLoggedIn } = require("../middleware");
const movies = require("../controllers/movies");

router.get("/", catchAsync(movies.renderMovies));

router.get("/:id", isLoggedIn, catchAsync(movies.showMovie));

module.exports = router;
