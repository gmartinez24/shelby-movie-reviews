const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MovieSchema = new Schema({
    title: String,
    year: Number,
    runtime: Number,
});

module.exports = mongoose.model("Movie", MovieSchema);
