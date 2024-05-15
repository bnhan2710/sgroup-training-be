const express = require('express')
const app = express()
require('dotenv').config()
const port = process.env.PORT;
const data = require('./db.json')
const route = require('./routes/index.route')
const morgan = require('morgan')

app.use(express.json())

app.use(morgan('dev'))
// app.use(express.static('public'))
//Router
route(app)

app.listen(port, () => {
  console.log(`Example app listening on port: ${port}`)
})

