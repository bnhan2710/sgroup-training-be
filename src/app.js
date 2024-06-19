//Require
const express = require('express')
const app = express()
const route = require('./routes/index.route')
const dotenv = require('dotenv')
const pool = require('./configs/database')
dotenv.config()

const port =  process.env.PORT || 3000
//Use
app.use(express.json())
app.use(express.static('public'))

// app.set("views",'./views')
// app.set('view engine','pug')


//Router
route(app)
app.use((req,res) => {
  return res.status(404).send('404 NOT FOUND')
})

app.listen(port, () => {
  console.log(`App listening on port: ${port}`)
})


