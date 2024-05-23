//Require
const express = require('express')
const app = express()
const port = 3000;
const data = require('./db.json')
const route = require('./routes/index.route')
const morgan = require('morgan')
const dotenv = require('dotenv')
//Use
const PORT = process.env.PORT
app.use(express.json())
app.use(morgan('dev'))

// app.use(express.static('public'))

// app.set("views",'./views')
// app.set('view engine','pug')

//Router
route(app)

app.use((req,res) => {
  return res.status(404).send('404 NOT FOUND')
})

app.listen(PORT, () => {
  console.log(`App listening on port: ${port}`)
})
