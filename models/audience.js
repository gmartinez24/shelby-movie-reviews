const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const AudienceSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    role: {
        type: String,
        default: "audience",
    },
});

AudienceSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("Audience", AudienceSchema);
