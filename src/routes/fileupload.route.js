const express = require('express');
const router = express.Router();
const fileController = require('../controllers/file.controller');
const verifyToken = require('../middlewares/verifyToken');
const upload = require('../middlewares/uploadfile');

router.post('/upload', verifyToken, upload.single('data'), fileController.uploadFile);

module.exports = router;
