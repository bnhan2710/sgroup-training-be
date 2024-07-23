const express = require('express');
const router = express.Router();
const fileController = require('../controllers/file.controller');
const verifyToken = require('../middlewares/verifyToken');
const upload = require('../middlewares/storageFile');

//Upload one file
router.post('/single', verifyToken, upload.single('data'), fileController.uploadSingleFile);
//Upload multiple files
router.post('/multiple', verifyToken, upload.array('data', 10), fileController.uploadMultipleFiles);

module.exports = router;
