const express  = require('express');
const router = express.Router( {mergeParams: true} );
const Campground = require('../models/campground');
const Review = require('../models/review');
const reviews = require('../controllers/reviews');
const { validateReview, isLoggedIn, isReviewAuthor} = require('../middleware')

const ExpressError = require('../utilities/ExpressErrors');
const catchAsync = require('../utilities/catchAsync');

const {campgroundSchema, reviewSchema} = require('../schemas');

router.post('/' , isLoggedIn, validateReview, catchAsync(reviews.createReview))

router.delete('/:reviewId',isLoggedIn, isReviewAuthor, catchAsync(reviews.deleteReview));

module.exports = router;