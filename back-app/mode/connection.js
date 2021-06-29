const mysql2 = require('mysql2');
const dbConfig = require('../config/db.config');

const connection = mysql2.createPool(dbConfig).promise();

module.exports = connection;