const fs = require('fs');
const path = require('path');
const datafile = require('../db.json');

let data = datafile; 

function writeData(data) {
    const filePath = path.join(__dirname, '../db.json');
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
}

function getAll() {
    return data.products;
}

function getOne(id) {
    return data.products.find(product => product.id === id);
}

function create(product) {
    data.products.push(product);
    writeData(data);
    return product;
}

function update(id, product) {
    const index = data.products.findIndex(product => product.id === id);
    data.products[index] = product;
    writeData(data);
    return product;
}

function remove(id) {
    const index = data.products.findIndex(product => product.id === id);
    data.products.splice(index, 1);
    writeData(data);
}

module.exports = {
    getAll,
    getOne,
    create,
    update,
    remove
};
