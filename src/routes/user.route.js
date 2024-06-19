
const express = require('express');
const router = express.Router();
const userControllers = require('../controllers/user.controllers.js')
//GET ALL USERS
router.get('/',userControllers.getAllUsers )
//GET USER BY ID
router.get('/:id',userControllers.getUserById)
module.exports = router;
