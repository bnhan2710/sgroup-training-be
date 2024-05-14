const express = require('express')
const app = express()
require('dotenv').config()
const port = process.env.PORT;
const data = require('./db.json')
const route = require('./routes/index.route')
const morgan = require('morgan')

app.use(express.json())
//Sử dụng để thay thế app.use(bodyParser.json()) đọc, phân tích yêu cầu HTTP và chuyển JSON thành Object

app.use(morgan('dev'))
app.use(express.static('public'))
//Router
route(app)

app.listen(port, () => {
  console.log(`Example app listening on port: ${port}`)
})

