const homepage = require('./home.route')
const apiroute = require('./api.route')
module.exports = (app) => {
    app.use('/', homepage)
    app.use('/api', apiroute)
}