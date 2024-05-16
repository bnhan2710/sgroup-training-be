const express = require('express')
const router = express.Router()
const productModel = require('../models/service')
router.get('/users', (req, res) => {
    res.json(productModel.getAll())
})
router.get('/users/:id', (req, res) => {
    const id = req.params.id
    res.json(productModel.getOne(id))
})
router.post('/users', (req, res) => {
    const dataCreate = req.body
    productModel.create(dataCreate) 
    res.json(productModel.getAll()) 
})
router.put('/users/:id',(req,res) =>{
    const id = req.params.id
    const dataUpdate = req.body
    productModel.update(id,dataUpdate)
    res.json(productModel.getAll())
})

router.delete('/users/:id', (req, res) => {
    const id = req.params.id
    productModel.remove(id)
    res.json(productModel.getAll())
})

module.exports = router