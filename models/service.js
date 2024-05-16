const fs = require('fs');
const path = require('path');
const data = require('../db.json');
function writeData(data) {
    const filePath = path.join(__dirname, '../db.json');
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
}

function getAll() {
    return data.products;
}

function getOne(id) {
    const index =  data.products.findIndex(product => product.id === id);
    if(index === -1) {
        return null;
    }
    return data.products[index];
}

function create(product) {
    let genid = data.products.length;
    product.id = genid + 1;
    data.products.push(product);
    writeData(data);
    return product;
}

function update(id, product) {
    let index = data.products.findIndex(product => product.id === id);
    if(index === -1) {
        return null;
    }
    data.products[index] = product;
    writeData(data);
}

function remove(id) {
    console.log('id', id)
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
