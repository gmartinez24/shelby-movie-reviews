const axios = require("axios");
const MovieReview = require("../models/movieReview");

module.exports.renderMovies = async (req, res) => {
    const title = req.query.movie;
    let queryResult;
    if (title) {
        queryResult = await axios.get(
            `https://api.themoviedb.org/3/search/movie?include_adult=false&query=${title}&api_key=48f9a2707c2061383ef9c9e434c792b1`
        );
    } else {
        queryResult = await axios.get(
            `https://api.themoviedb.org/3/movie/popular?include_adult=false&language=en-US&page=1&api_key=48f9a2707c2061383ef9c9e434c792b1`
        );
    }
    const searchedMovies = queryResult.data.results;

    res.render("movies/index", { searchedMovies });
};

module.exports.showMovie = async (req, res) => {
    const queryMovie = await axios.get(`https://api.themoviedb.org/3/movie/${req.params.id}?api_key=48f9a2707c2061383ef9c9e434c792b1`);
    const movie = queryMovie.data;
    const reviews = await MovieReview.find({ movie_id: movie.id }).populate("author");
    res.render("movies/show", { movie, reviews });
};
