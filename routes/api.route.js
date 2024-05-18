// routes/productRoutes.js
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productsControllers');

router.get('/users', productController.getAll);
router.get('/users/:id', productController.getOne);
router.post('/users', productController.create);
router.put('/users/:id', productController.update);
router.delete('/users/:id', productController.remove);

module.exports = router;
