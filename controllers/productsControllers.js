const productService = require('../services/productService')

function getAll(req, res) {
    const products = productService.getAll();
    res.json(products);
}

function getOne(req, res) {
    const id = req.params.id;
    const product = productService.getOne(id);
    res.json(product);
}

function create(req, res) {
    const dataCreate = req.body;
    productService.create(dataCreate);
    res.json(productService.getAll());
}

function update(req, res) {
    const id = req.params.id;
    const dataUpdate = req.body;
    productService.update(id, dataUpdate);
    res.json(productService.getAll());
}

function remove(req, res) {
    const id = req.params.id;
    productService.remove(id);
    res.json(productService.getAll());
}

module.exports = {
    getAll,
    getOne,
    create,
    update,
    remove
};
