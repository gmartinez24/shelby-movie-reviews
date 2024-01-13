const MovieReview = require("../models/movieReview");

module.exports.createReview = async (req, res) => {
    req.flash("success", "Successfully posted a review");
    const newReview = new MovieReview({
        rating: req.body.movieReview.rating,
        body: req.body.movieReview.body,
        movie_id: req.params.id,
        author: req.user._id,
    });

    await newReview.save();
    res.redirect(`/movies/${req.params.id}`);
};

module.exports.deleteReview = async (req, res) => {
    req.flash("success", "Successfully deleted a review");
    await MovieReview.findByIdAndDelete(req.params.reviewid);
    res.redirect(`/movies/${req.params.id}`);
};
