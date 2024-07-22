const { body, validationResult } = require("express-validator");
const { STATUS } = require("../constants");

const STATUS_VALID = [STATUS.COMPLETED, STATUS.PENDING, STATUS.INPROCESS];

const createTaskValidation = [
    body('title')
        .isString().withMessage('Title must be a string')
        .notEmpty().withMessage('Title is required'),
    body('description')
        .isString().withMessage('Description must be a string')
        .notEmpty().withMessage('Description is required'),
    body('status')
        .isString().withMessage('Status must be a string')
        .isIn(STATUS_VALID).withMessage('Invalid status')
        .notEmpty().withMessage('Status is required'),
];

const updateTaskValidation = [
    body('id')
    .isInt().withMessage('Id must be a interger')
    .notEmpty().withMessage('Id is required'),
    body('title')
        .isString().withMessage('Title must be a string'),
    body('description')
        .isString().withMessage('Description must be a string'),
    body('status')
        .isString().withMessage('Status must be a string')
        .isIn(STATUS_VALID).withMessage('Invalid status')
];

const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};
module.exports = { createTaskValidation, updateTaskValidation, handleValidationErrors};