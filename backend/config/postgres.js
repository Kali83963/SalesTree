

const Pool = require('pg').Pool
const pool = new Pool({
  user: 'admin',
  host: 'localhost',
  database: 'salestree',
  password: 'admin',
  port: 5432,
})

module.exports = {
    query: (text, params) => pool.query(text, params)
};