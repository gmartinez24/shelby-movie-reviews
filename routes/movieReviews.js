const express = require("express");
const router = express.Router({ mergeParams: true });
const catchAsync = require("../utils/catchAsync");
// const { movieReviewSchema } = require("../schemas");
// const joi = require("joi");
// const MovieReview = require("../models/movieReview");
// const ExpressError = require("../utils/ExpressError");
// const axios = require("axios");
const { ensureReviewer, isReviewAuthor, validateMovieReviews } = require("../middleware");
const movieReviews = require("../controllers/movieReviews");

router.post("/", ensureReviewer, validateMovieReviews, catchAsync(movieReviews.createReview));

router.delete("/:reviewid", ensureReviewer, isReviewAuthor, catchAsync(movieReviews.deleteReview));

module.exports = router;
