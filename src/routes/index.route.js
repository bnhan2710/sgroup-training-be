const authRoute = require('./auth.route.js')
const userRoute = require('./user.route.js')
module.exports = (app) => {
    app.use('/auth',authRoute)
    app.use('/api/users',userRoute)
}