const {body} = require('express-validator');

const register = [
    body('username').isLength({ min: 3 }).withMessage('Username must be at least 3 characters long'),
    body('name').notEmpty().withMessage('Name must be not empty'),
    body('email').isEmail().withMessage('Email is invalid'),
    body('password').isLength({ min: 3 }).withMessage('Password must be at least 6 characters long'),
    body('age').isNumeric().withMessage('Age must be a number and not empty'),
];


module.exports = {
    register,
}