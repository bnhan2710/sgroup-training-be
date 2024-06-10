const login = require('./login.js')
const user = require('./user.route.js')
module.exports = (app) => {
    app.use('/login',login )
    app.use('/customers',user )
}