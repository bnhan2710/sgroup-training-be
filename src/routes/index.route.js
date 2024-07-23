const authRoute = require('./auth.route.js')
const userRoute = require('./user.route.js')
const uploadRoute = require('./fileupload.route.js')
const userManagerRoute = require('./userMangaer.route.js')
const pollRoute = require('./polls.route.js')
const roleRoute = require('./role.route.js')
module.exports = (app) => {
    app.use('/api/v1/user',userRoute)
    app.use('/api/v2/user',userManagerRoute)
    app.use('/api/v1/auth',authRoute)
    app.use('/api/v1/role',roleRoute)
    app.use('/api/v1/upload',uploadRoute)
    app.use('/api/v1/polls',pollRoute)
}