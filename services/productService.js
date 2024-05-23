// services/productService.js
const fs = require('fs');
const path = require('path');
const data = require('../db.json');

function writeData(data) {
    try{
    const filePath = path.join(__dirname, '../db.json');
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
    } catch(err) {
        console.log('Write data error');
    }
}

function getAll() {
    return data.products;
}

function getOne(id) {
    const index = data.products.findIndex(product => product.id === id);
    if (index === -1) {
        return null;
    }
    return data.products[index];
}

function create(product) {
    let maxID = data.products[data.products.length - 1].id;
    const newId = parseInt(maxID) + 1;
    product.id = newId.toString();
    data.products.push(product);
    writeData(data);
    return product;
}

function update(id, product) {
    let index = data.products.findIndex(product => product.id === id);
    if (index === -1) {
        return null;
    }
    data.products[index] = { id, ...product };
    writeData(data);
    return data.products[index];
}

function remove(id) {
    const index = data.products.findIndex(product => product.id === id);
    if (index === -1) {
        return null;
    }
    const removedProduct = data.products.splice(index, 1);
    writeData(data);
    return removedProduct;
}

module.exports = {
    getAll,
    getOne,
    create,
    update,
    remove
};
