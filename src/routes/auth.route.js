const router = require('express').Router()
const authController = require('../controllers/auth.controllers')
// Login
router.post('/login', authController.loginUser)
// Register
router.post('/register', authController.registerUser)
module.exports = router
