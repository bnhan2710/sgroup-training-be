const router = require('express').Router();
const userManagerController = require("../controllers/user/userManagement.controler");
const asyncHandler = require('../middlewares/asyncHandle')
//CREATE USER
router.post('/create',asyncHandler(userManagerController.create));

//UPDATE USER
router.put('/update/:id',asyncHandler(userManagerController.update));

//DELETE USER
router.delete('/delete/:id', asyncHandler(userManagerController.deleteUser));

//GET USER BY ID
router.get('/:id',asyncHandler(userManagerController.getUserById));

//GET USER WITH PAGINATION
router.get('/',asyncHandler(userManagerController.getUserWithPagination));


module.exports = router;
