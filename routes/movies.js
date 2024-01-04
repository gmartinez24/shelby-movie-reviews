const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const ExpressError = require("../utils/ExpressError");
const MovieReview = require("../models/movieReview");
const axios = require("axios");

router.get(
    "/",
    catchAsync(async (req, res) => {
        const title = req.query.movie;
        if (title) {
            const queryResult = await axios.get(
                `https://api.themoviedb.org/3/search/movie?include_adult=false&query=${title}&api_key=48f9a2707c2061383ef9c9e434c792b1`
            );
            const searchedMovies = queryResult.data.results;

            res.render("movies/index", { searchedMovies });
        } else {
            const searchedMovies = "undefined";
            res.render("movies/index", { searchedMovies });
        }
    })
);

router.get(
    "/:id",
    catchAsync(async (req, res) => {
        const queryMovie = await axios.get(`https://api.themoviedb.org/3/movie/${req.params.id}?api_key=48f9a2707c2061383ef9c9e434c792b1`);
        const movie = queryMovie.data;
        const reviews = await MovieReview.find({ movie_id: movie.id });
        res.render("movies/show", { movie, reviews });
    })
);

module.exports = router;
