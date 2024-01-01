const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MovieSchema = new Schema({
    title: String,
    genres: [
        {
            id: Number,
            name: String,
        },
    ],
    poster_path: String,
    release_date: String,
    runtime: Number,
    tmdb_id: Number,
    description: String,
});

module.exports = mongoose.model("Movie", MovieSchema);
