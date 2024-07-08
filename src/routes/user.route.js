const express = require("express");
const router = express.Router();
const userControllers = require("../controllers/User/user.controllers.js");
const verifyToken = require('../middlewares/verifyToken.js')
//GET ALL USERS
router.get("/",verifyToken, userControllers.getAllUsers);
//GET USER BY ID
router.get("/:id", userControllers.getUserById);
//CREATE USER
router.post("/", userControllers.createUser);
//UPDATE USER
router.put("/:id", userControllers.updateUser);
//DELETE USER
router.delete("/:id", userControllers.deleteUser);
//GET ALL USER WITH PAGINATION
router.get("/get/:id", userControllers.getUserById);
module.exports = router;
