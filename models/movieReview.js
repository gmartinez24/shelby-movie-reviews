const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MovieReviewSchema = new Schema({
    rating: Number,
    body: String,
    movie_id: Number,
    author: {
        type: Schema.Types.ObjectId,
        ref: "Reviewer",
    },
});

module.exports = mongoose.model("MovieReview", MovieReviewSchema);
