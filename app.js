const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const Movie = require("./models/movie");
const axios = require("axios");

mongoose.connect("mongodb://127.0.0.1:27017/shelby-reviews");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const app = express();

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.get("/", (req, res) => {
    res.render("home");
});

app.get("/movies", async (req, res) => {
    //const movies = await Movie.find({});
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
});

app.get("/movies/new", async (req, res) => {
    res.render("movies/new");
});

app.post("/movies", async (req, res) => {
    const newMovie = new Movie(req.body.movie);
    await newMovie.save();
    res.redirect(`/movies/${newMovie._id}`);
});

app.get("/movies/:id", async (req, res) => {
    try {
        const queryMovie = await axios.get(`https://api.themoviedb.org/3/movie/${req.params.id}?api_key=48f9a2707c2061383ef9c9e434c792b1`);
        const newMovieData = queryMovie.data;
        const movie = await Movie.findOneAndUpdate(
            { tmdb_id: req.params.id },
            {
                tmdb_id: newMovieData.id,
                title: newMovieData.title,
                genres: newMovieData.genres,
                poster_path: newMovieData.poster_path,
                release_date: newMovieData.release_date,
                runtime: newMovieData.runtime,
                description: newMovieData.overview,
            },
            {
                new: true,
                upsert: true,
            }
        );

        res.render("movies/show", { movie });
    } catch (err) {
        console.log("ERROR", err);
    }
});

app.get("/movies/:id/edit", async (req, res) => {
    const movie = await Movie.findById(req.params.id);
    res.render("movies/edit", { movie });
});

app.put("/movies/:id", async (req, res) => {
    const { id } = req.params;
    await Movie.findByIdAndUpdate(id, { ...req.body.movie });
    res.redirect(`/movies/${id}`);
});

app.delete("/movies/:id", async (req, res) => {
    const { id } = req.params;
    const movie = await Movie.findByIdAndDelete(id);
    res.redirect("/movies");
});

app.listen(3000, () => {
    console.log("Serving on port 3000");
});
