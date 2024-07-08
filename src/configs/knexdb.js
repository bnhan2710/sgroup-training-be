require('dotenv').config();
const knex = require('knex')({
    client: 'mysql2',
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME, 
    },
    pool: { min: 0, max: 7 },
});

function testConnection() {
    knex.raw('SELECT 1')
        .then(() => {
            console.log('Database with knex connected !!');
        })
        .catch((err) => {
            console.error('Connect Database Fail !!', err);
        });
}

testConnection();

module.exports = knex;