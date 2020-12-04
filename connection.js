// Set up MySQL connection.
const mysql = require("mysql");
const keys = require('./keys')
//connection configuration 
const connection = mysql.createPool(keys);


// Export
module.exports = connection;