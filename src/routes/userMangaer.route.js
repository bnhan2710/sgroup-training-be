const router = require('express').Router();
const userManagerController = require("../controllers/User/userManagement.controler");
const knex = require('../configs/knexdb');

//CREATE USER
router.post('/create',userManagerController.create);

//UPDATE USER
router.put('/update/:id',userManagerController.update);

//DELETE USER
router.delete('/delete/:id',userManagerController.deleteUser);

//GET USER BY ID
router.get('/get/:id',userManagerController.getUserById);

//GET USER WITH PAGINATION
router.get('/get',userManagerController.getUserWithPagination);
module.exports = router;
