const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const ExpressError = require("./utils/ExpressError");
const ejsMate = require("ejs-mate");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const Audience = require("./models/audience");
const Reviewer = require("./models/reviewer");

const reviewerRoutes = require("./routes/reviewer");
const audienceRoutes = require("./routes/audience");
const movieRoutes = require("./routes/movies");
const movieReviewRoutes = require("./routes/movieReviews");

mongoose.connect("mongodb://127.0.0.1:27017/shelby-reviews");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const app = express();

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

const sessionConfig = {
    secret: "ThisShouldBeABetterSecret",
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        // expires in one week
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7,
    },
};
app.use(session(sessionConfig));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use("audienceLocal", new LocalStrategy(Audience.authenticate()));
passport.use("reviewerLocal", new LocalStrategy(Reviewer.authenticate()));

// passport.serializeUser(Reviewer.serializeUser());
// passport.deserializeUser(Reviewer.deserializeUser());
// passport.serializeUser(Audience.serializeUser());
// passport.deserializeUser(Audience.deserializeUser());
passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    if (user != null) done(null, user);
});

app.use((req, res, next) => {
    res.locals.activePath = req.path;
    res.locals.currentUser = req.user;
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    next();
});

//routes
app.use("/reviewer", reviewerRoutes);
app.use("/audience", audienceRoutes);
app.use("/movies", movieRoutes);
app.use("/movies/:id/reviews", movieReviewRoutes);

app.get("/logout", (req, res) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        req.flash("success", "Goodbye!");
        res.redirect("/movies");
    });
});

app.get("/", (req, res) => {
    res.render("home");
});

app.all("*", (req, res, next) => {
    next(new ExpressError("Page Not Found", 404));
});

app.use((err, rew, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = "Oh no, Something went wrong";
    res.status(statusCode).render("error", { err });
});

app.listen(3000, () => {
    console.log("Serving on port 3000");
});
