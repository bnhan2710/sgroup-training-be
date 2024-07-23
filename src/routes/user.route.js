const express = require("express");
const router = express.Router();
const userControllers = require("../controllers/User/user.controllers.js");
const verifyToken = require('../middlewares/verifyToken.js')
const {authorizeRole} = require('../middlewares/authorizeRole.js')
//GET ALL USERS
router.get("/",verifyToken, authorizeRole('getAll'),userControllers.getAllUsers);
//GET USER BY ID
router.get("/:id",verifyToken,authorizeRole('getOne'), userControllers.getUserById);
//CREATE USER
router.post("/", userControllers.createUser);
//UPDATE USER
router.put("/:id", userControllers.updateUser);
//DELETE USER
router.delete("/:id", userControllers.deleteUser);
module.exports = router;
