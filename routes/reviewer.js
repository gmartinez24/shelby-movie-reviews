const express = require("express");
const router = express.Router();
const passport = require("passport");
const catchAsync = require("../utils/catchAsync");
const Reviewer = require("../models/reviewer");
const { storeReturnTo } = require("../middleware");

router.get("/register", (req, res) => {
    res.render("users/reviewerRegister");
});

// register a reviewer
router.post(
    "/register",
    catchAsync(async (req, res) => {
        try {
            const { email, username, password } = req.body;
            const reviewer = new Reviewer({ email, username });
            const registeredReviewer = await Reviewer.register(reviewer, password);
            req.login(registeredReviewer, (err) => {
                if (err) return next();
            });
            req.flash("success", "Welcome to Shelby Reviews");
            res.redirect("/movies");
        } catch (e) {
            req.flash("error", e.message);
            res.redirect("register");
        }
    })
);

router.get("/login", (req, res) => {
    res.render("users/reviewerLogin");
});

// authenticate reviewer on login
router.post(
    "/login",
    storeReturnTo,
    passport.authenticate("reviewerLocal", { failureFlash: true, failureRedirect: "/reviewer/login" }),
    (req, res) => {
        req.flash("success", "Welcome Back!");
        const redirectUrl = res.locals.returnTo || "/movies";
        res.redirect(redirectUrl);
    }
);

module.exports = router;
