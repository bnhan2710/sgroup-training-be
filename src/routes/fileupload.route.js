const express = require('express');
const router = express.Router();
const fileController = require('../controllers/file.controller');
const verifyToken = require('../middlewares/verifyToken');
const upload = require('../middlewares/uploadFile');

router.post('/', verifyToken, upload.single('data'), fileController.uploadFile);

module.exports = router;
