const express = require('express')
const router = express.Router()
const data = require('../db.json')
const productModel = require('../models/service')
router.get('/', (req, res) => {
    res.json(productModel.getAll())
})
router.post('/', (req, res) => {
    const dataCreate = req.body
    productModel.create(dataCreate) 
    res.json(productModel.getAll()) 
})
router.put('/:id',(req,res) =>{
    const id = req.params.id
    const dataUpdate = req.body
    productModel.update(id,dataUpdate)
    res.json(productModel.getAll())
})

router.delete('/:id', (req, res) => {
    const id = req.params.id
    productModel.remove(id)
    res.json(productModel.getAll())
})

module.exports = router