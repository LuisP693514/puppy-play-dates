
const { check } = require("express-validator");
const handleValidationErrors = require('./handleValidationErrors');

const validateDoggyInputs = [
    check('puppyName')
        .exists({ checkFalsy: true })
        .isLength({ min: 2, max: 30 })
        .withMessage('Puppy name must be between 2 and 30 characters.'),
    check('puppyAge')
        .exists({ checkFalsy: true })
        .isInt({ min: 1 })
        .withMessage('Puppy\'s age must be a number greater than 0.'),
    check('puppyBreed')
        .exists({ checkFalsy: true })
        .isLength({ min: 2, max: 30 })
        .withMessage('Puppy breed invalid.'),
    handleValidationErrors
];

module.exports = validateDoggyInputs;