const mysql2 = require('mysql2');
const config = require('../config/db.config');

//подключение к БД
const connection = mysql2.createConnection(config).promise();

connection.connect(function (err) {
    if (err) {
        return console.error("Ошибка: " + err.message);
    } else {
        console.log("Подключение к серверу MySQL успешно установлено");
    }
});

module.exports = connection;