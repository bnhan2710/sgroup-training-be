const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.render('./pages/login.pug')
})

module.exports = router