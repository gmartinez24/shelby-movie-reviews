const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MovieReviewSchema = new Schema({
    rating: Number,
    body: String,
    movie_id: Number,
});

module.exports = mongoose.model("MovieReview", MovieReviewSchema);
