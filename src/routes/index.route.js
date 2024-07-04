const authRoute = require('./auth.route.js')
const userRoute = require('./user.route.js')
const uploadRoute = require('./fileupload.route.js')
module.exports = (app) => {
    app.use('/auth',authRoute)
    app.use('/api/users',userRoute)
    app.use('/api',uploadRoute)
}