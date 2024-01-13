const express = require("express");
const router = express.Router();
const passport = require("passport");
const catchAsync = require("../utils/catchAsync");
const { storeReturnTo } = require("../middleware");
const users = require("../controllers/users");

router.get("/register", users.renderAudienceRegister);

// register an audience member
router.post("/register", catchAsync(users.registerAudience));

router.get("/login", users.renderAudienceLogin);

// authenticate audience member on login
router.post(
    "/login",
    storeReturnTo,
    passport.authenticate("audienceLocal", { failureFlash: true, failureRedirect: "/audience/login" }),
    users.loginAudience
);

module.exports = router;
