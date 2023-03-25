const mysql = require('mysql');

// Create MySQL connection pool
const pool = mysql.createPool({
  connectionLimit: 10,
  host: '127.0.0.1',
  user: 'db_user',
  password: 'secretCloud23',
  database: 'mydb'
});


// Middleware function to store requester IPs in MySQL
function storeRequesterIP(req, res, next) {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const method = req.method;
    const url = req.originalUrl;
    // Insert IP address into MySQL table
    pool.query('INSERT INTO requester_ips (ip,method,url) VALUES (?,?,?)', [ip, method, url], (error, results, fields) => {
      if (error) {
        console.error(error);
      }
    });
    next();
}
  
module.exports = storeRequesterIP;