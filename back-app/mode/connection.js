const mysql2 = require('mysql2');
const dbConfig = require('../config/db.config');

const connection = mysql2.createConnection(dbConfig).promise();

connection.connect(err => {
    if (err) throw err;
    console.log(`connect to ${dbConfig.database}`);
});

module.exports = connection;