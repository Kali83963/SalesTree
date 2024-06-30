

const Pool = require('pg').Pool

require('dotenv').config();
const pool = new Pool({
  user: 'salestree',
  host: 'localhost',
  database: 'salestree',
  password: 'salestree',
  port: 5432,
})


// const pool = new Pool({
//   connectionString: process.env.POSTGRES_URL,
// })

// pool.connect((err)=>{
//   if(err){
//     throw err;
//   }
//   console.log("connected");
//   process.exit();
// })



module.exports = {
    query: (text, params) => pool.query(text, params)
};