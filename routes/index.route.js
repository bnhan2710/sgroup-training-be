const homepage = require('./home.route')
const product = require('./product.route')
module.exports = (app) => {
    app.use('/', homepage)
    app.use('/products', product)
}