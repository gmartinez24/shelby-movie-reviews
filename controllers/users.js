const Audience = require("../models/audience");

module.exports.renderAudienceRegister = (req, res) => {
    res.render("users/audienceRegister");
};

module.exports.registerAudience = async (req, res) => {
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
};

module.exports.renderAudienceLogin = (req, res) => {
    res.render("users/audienceLogin");
};

module.exports.loginAudience = (req, res) => {
    req.flash("success", "Welcome Back!");
    const redirectUrl = res.locals.returnTo || "/movies";
    res.redirect(redirectUrl);
};

module.exports.logout = (req, res) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        req.flash("success", "Goodbye!");
        res.redirect("/movies");
    });
};

module.exports.renderReviewerLogin = (req, res) => {
    res.render("users/reviewerLogin");
};

module.exports.reviewerLogin = (req, res) => {
    req.flash("success", "Welcome Back!");
    console.log("logged in");
    const redirectUrl = res.locals.returnTo || "/movies";
    res.redirect(redirectUrl);
};

// module.exports.renderReviewerRegister = (req, res) => {
//     res.render("users/reviewerRegister");
// };

// module.exports.registerReviewer = async (req, res) => {
//     try {
//         const { email, username, password } = req.body;
//         const reviewer = new Reviewer({ email, username });
//         const registeredReviewer = await Reviewer.register(reviewer, password);
//         req.login(registeredReviewer, (err) => {
//             if (err) return next();
//         });
//         req.flash("success", "Welcome to Shelby Reviews");
//         res.redirect("/movies");
//     } catch (e) {
//         req.flash("error", e.message);
//         res.redirect("register");
//     }
// };
