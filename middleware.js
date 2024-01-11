const MovieReview = require("./models/movieReview");

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl;
        req.flash("error", "You must be signed in first!");
        return res.redirect("/audience/login");
    }
    console.log("logged in");
    next();
};

module.exports.ensureReviewer = (req, res, next) => {
    if (!req.isAuthenticated() || req.user.role !== "reviewer") {
        req.session.returnTo = req.originalUrl;
        req.flash("error", "You must be signed in as a reviewer first!");
        return res.redirect("/reviewer/login");
    }
    console.log("reviwer checked");
    next();
};

module.exports.isReviewAuthor = async (req, res, next) => {
    const { id, reviewid } = req.params;
    const review = await MovieReview.findById(reviewid).populate("author");
    console.log(review);
    if (!review.author.equals(req.user._id)) {
        req.flash("error", "You do not have permission to do that!");
        return res.redirect(`/movies/${id}`);
    }
    next();
};

module.exports.storeReturnTo = (req, res, next) => {
    if (req.session.returnTo) {
        res.locals.returnTo = req.session.returnTo;
    }
    next();
};
