// routes/productRoutes.js
const express = require('express');
const router = express.Router();
const pool = require('../database/connection.js');
router.get('/', (req, res) => {
    pool.query('SELECT * FROM CUSTOMERS', (err, rows) => {
        if (err) {
            console.log(err);
            return;
        }
        res.json(rows);
    });
})

module.exports = router;
