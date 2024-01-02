const Joi = require("joi");

module.exports.movieReviewSchema = Joi.object({
    // movieReview: {
    //     rating: number,
    //     body: String,
    //     movie_id: number,
    // },
    movieReview: Joi.object({
        rating: Joi.number().required().min(1).max(10),
        body: Joi.string().required(),
        //movie_id: Joi.number().required(),
    }).required(),
});
