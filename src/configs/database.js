const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '27102005',
  database: 'sgroup',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

const testConnection = async () => {
  try{
  const connection = await pool.getConnection();
  console.log('Database connected !!');
  connection.release();
  }catch(err){
    console.log('Connect Database Fail !!')
  }
};
testConnection();

module.exports = pool;