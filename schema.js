const Joi = require('joi');
module.exports.listingSchema = Joi.object({
    listing: Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        location: Joi.string().required(),
        country: Joi.string().required(),
        price: Joi.number().required().min(0),
        image: Joi.string().allow("",null) //means that image is of string type and can be empty string or null 
    }).required()
});


module.exports.reviewSchema=Joi.object({
    review: Joi.object({
        rating: Joi.number().required().min(1).max(5),
        comment:Joi.string().required()
    }).required()
})


// const Joi = require('joi');

// module.exports.listingSchema = Joi.object({
//     listing: Joi.object({
//         title: Joi.string().required(),
//         description: Joi.string().optional().allow(''),
//         location: Joi.string().required(),
//         country: Joi.string().required(),
//         price: Joi.number().required().min(0),
//         image: Joi.object({
//             url: Joi.string().uri().optional().allow(null),
//             filename: Joi.string().optional().allow(null)
//         }).optional().allow(null),
//         geometry: Joi.object({
//             type: Joi.string().valid('Point').required(),
//             coordinates: Joi.array().items(
//                 Joi.number().required()
//             ).length(2).required()
//         }).required()
//     }).required()
// });

// module.exports.reviewSchema = Joi.object({
//     review: Joi.object({
//         rating: Joi.number().required().min(1).max(5),
//         comment: Joi.string().required()
//     }).required()
// });

