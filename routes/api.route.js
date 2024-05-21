// routes/productRoutes.js
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productsControllers');

const Validate = (req,res,next) => {
    const {price,quantity} = req.body;
    if(!price || price<= 0){
        res.status(400).json('Price must be greater than 0');
    }
    if(!quantity || quantity<= 0){
        res.status(400).json('Quantity must be greater than 0');
    }
    next();
}
 

router.get('/users', productController.getAll);
router.get('/users/:id',productController.getOne);
router.post('/users', Validate, productController.create);
router.put('/users/:id', productController.update);
router.delete('/users/:id', productController.remove);

module.exports = router;
