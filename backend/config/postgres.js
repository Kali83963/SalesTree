

const Pool = require('pg').Pool
const pool = new Pool({
  user: 'salestree',
  host: 'localhost',
  database: 'salestree',
  password: 'salestree',
  port: 5432,
})

module.exports = {
    query: (text, params) => pool.query(text, params)
};