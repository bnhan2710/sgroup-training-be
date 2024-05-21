//Require
const express = require('express')
const app = express()
const port = 3000;
const data = require('./db.json')
const route = require('./routes/index.route')
const morgan = require('morgan')

//Use
app.use(express.json())
app.use(morgan('dev'))
// app.use(express.static('public'))

//Set
app.set("views",'./views')
app.set('view engine','pug')

//Router
route(app)

app.listen(port, () => {
  console.log(`App listening on port: ${port}`)
})
