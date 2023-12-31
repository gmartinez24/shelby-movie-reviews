const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const Movie = require("./models/movie");

mongoose.connect("mongodb://127.0.0.1:27017/shelby-reviews");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("home");
});

app.get("/movies", async (req, res) => {
    const movies = await Movie.find({});
    res.render("movies/index", { movies });
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
    const movie = await Movie.findById(req.params.id);
    res.render("movies/show", { movie });
});

app.listen(3000, () => {
    console.log("Serving on port 3000");
});
