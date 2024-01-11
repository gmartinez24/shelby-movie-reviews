const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const ReviewerSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    role: {
        type: String,
        default: "reviewer",
    },
});

ReviewerSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("Reviewer", ReviewerSchema);
