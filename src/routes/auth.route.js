const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth.controllers')

//LOGIN 
router.post('/login', authController.UserLogin)

module.exports = router
