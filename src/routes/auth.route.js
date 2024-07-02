const router = require('express').Router()
const authController = require('../controllers/auth.controllers')
// Login
router.post('/login', authController.loginUser)
// Register
router.post('/register', authController.registerUser)
// Forgot password
router.post('/forgot-password', authController.forgotPassword)
// Reset password
router.post('/reset-password/:token', authController.resetPassword)
module.exports = router
