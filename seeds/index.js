const mongoose = require("mongoose");
const Movie = require("../models/movie");
const movies = require("./movies");

mongoose.connect("mongodb://127.0.0.1:27017/shelby-reviews");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const seedDB = async () => {
    await Movie.deleteMany({});
    for (let movie of movies) {
        const r = new Movie({
            title: `${movie.title}`,
            year: movie.year,
            runtime: movie.runtime,
        });
        await r.save();
    }
};

seedDB().then(() => {
    mongoose.connection.close();
});
