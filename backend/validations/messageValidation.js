const { check } = require("express-validator");
const handleValidationErrors = require('./handleValidationErrors');

const validateMessage = [
    check('body')
        .exists({ checkFalsy: true })
        .isLength({ min: 1, max: 1000 })
        .withMessage('Message must be at least 1 character and at most 1000 '),
    handleValidationErrors
];

module.exports = validateMessage;