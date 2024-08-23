const express = require("express");
const router = express.Router();
const userControllers = require("../controllers/User/user.controllers.js");
const verifyToken = require('../middlewares/verifyToken.js')
const {authorizeRole} = require('../middlewares/authorizeRole.js')
const asyncHandler = require('../middlewares/asyncHandle.js')
//GET ALL USERS
router.get("/",verifyToken, authorizeRole('getAll'),asyncHandler(userControllers.getAllUsers));
//GET USER BY ID
router.get("/:id",verifyToken,authorizeRole('getOne'), asyncHandler(userControllers.getUserById));
//CREATE USER
router.post("/",verifyToken, authorizeRole('Create'), asyncHandler(userControllers.createUser));
//UPDATE USER
router.put("/:id", asyncHandler(userControllers.updateUser));
//DELETE USER
router.delete("/:id",verifyToken, authorizeRole('Delete'), asyncHandler(userControllers.deleteUser));
module.exports = router;
