const express = require("express");
const router = express.Router({ mergeParams: true });
const catchAsync = require("../utils/catchAsync");
const { movieReviewSchema } = require("../schemas");
const joi = require("joi");
const MovieReview = require("../models/movieReview");
const ExpressError = require("../utils/ExpressError");
const axios = require("axios");
const { ensureReviewer, isReviewAuthor } = require("../middleware");

const validateMovieReviews = (req, res, next) => {
    const { error } = movieReviewSchema.validate(req.body);
    if (error) {
        const msg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(msg, 400);
    } else {
        next();
    }
};

router.post(
    "/",
    ensureReviewer,
    validateMovieReviews,
    catchAsync(async (req, res) => {
        req.flash("success", "Successfully posted a review");
        const newReview = new MovieReview({
            rating: req.body.movieReview.rating,
            body: req.body.movieReview.body,
            movie_id: req.params.id,
            author: req.user._id,
        });

        await newReview.save();
        res.redirect(`/movies/${req.params.id}`);
    })
);

router.delete(
    "/:reviewid",
    ensureReviewer,
    isReviewAuthor,
    catchAsync(async (req, res) => {
        req.flash("success", "Successfully deleted a review");
        await MovieReview.findByIdAndDelete(req.params.reviewid);
        //res.send(req.params.reviewid);
        res.redirect(`/movies/${req.params.id}`);
    })
);

module.exports = router;
