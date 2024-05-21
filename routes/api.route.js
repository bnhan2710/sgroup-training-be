// routes/productRoutes.js
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productsControllers');
const Validate = require('../middleware/validate.input');

router.get('/users', productController.getAll);
router.get('/users/:id',productController.getOne);
router.post('/users', Validate, productController.create);
router.put('/users/:id',Validate, productController.update);
router.delete('/users/:id', productController.remove);

module.exports = router;
