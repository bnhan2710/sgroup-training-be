const data = require('../db.json')

function getAll() {
    return data.products
}
function getOne(id) {
    return data.products.find(product => product.id === id)
}
function create(product) {
    data.products.push(product)
    return product
}
function update(id,product){
    const index = data.products.findIndex(product => product.id === id)
    data.products[index] = product
}
function remove(id) {
    const index = data.products.findIndex(product => product.id === id)
    data.products.splice(index,1)
}
module.exports = {
    getAll,
    getOne,
    create,
    update,
    remove
}