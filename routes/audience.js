const express = require("express");
const router = express.Router();
const passport = require("passport");
const catchAsync = require("../utils/catchAsync");
const Audience = require("../models/audience");
const { storeReturnTo } = require("../middleware");

router.get("/register", (req, res) => {
    res.render("users/audienceRegister");
});

// register an audience member
router.post(
    "/register",
    catchAsync(async (req, res) => {
        try {
            const { email, username, password } = req.body;
            const audienceMember = new Audience({ email, username });
            const registeredUser = await Audience.register(audienceMember, password);
            req.login(registeredUser, (err) => {
                if (err) return next();
                req.flash("success", "Welcome to Shelby Reviews");
                res.redirect("/movies");
            });
        } catch (e) {
            req.flash("error", e.message);
            res.redirect("register");
        }
    })
);

router.get("/login", (req, res) => {
    res.render("users/audienceLogin");
});

// authenticate audience member on login
router.post(
    "/login",
    storeReturnTo,
    passport.authenticate("audienceLocal", { failureFlash: true, failureRedirect: "/audience/login" }),
    (req, res) => {
        req.flash("success", "Welcome Back!");
        const redirectUrl = res.locals.returnTo || "/movies";
        res.redirect(redirectUrl);
    }
);

module.exports = router;
