const router = require('express').Router()
const authController = require('../controllers/auth/auth.controllers')
const verifyToken = require('../middlewares/verifyToken')

// Login
router.post('/login', authController.loginUser)
// Register
router.post('/register', authController.registerUser)
//Log out
router.post('/logout',verifyToken, authController.logoutUser)
// Refresh token
router.post('/refresh', authController.requestNewToken)
// Forgot password
router.post('/forgot-password', authController.forgotPassword)
// Reset password
router.post('/reset-password/:token', authController.resetPassword)


module.exports = router
