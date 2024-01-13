const express = require("express");
const router = express.Router();
const passport = require("passport");
const catchAsync = require("../utils/catchAsync");
const Reviewer = require("../models/reviewer");
const { storeReturnTo } = require("../middleware");
const users = require("../controllers/users");

router.get("/login", users.renderReviewerLogin);

// authenticate reviewer on login
router.post(
    "/login",
    storeReturnTo,
    passport.authenticate("reviewerLocal", { failureFlash: true, failureRedirect: "/reviewer/login" }),
    users.reviewerLogin
);

// router.get("/register", users.renderReviewerRegister);

// register a reviewer... commented out because we only want 3 reviewer accounts. No more should be made
// router.post("/register", catchAsync(users.registerReviewer));

module.exports = router;
