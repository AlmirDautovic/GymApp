const mysql = require('mysql');

const MySqlDB = mysql.createConnection({
    host: 'localhost',
    database: 'gymapp',
    user: 'almir',
    password: 'almir',
})

module.exports = MySqlDB;