const express = require("express");
const fs = require('fs');
const app = express();

app.use(function (request, response, next) {
    let now = new Date();
    let hour = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    let data = `${hour}:${minutes}:${seconds} ${request.method} ${request.url} ${request.get("user-agent")}`;
    console.log(data);
    fs.appendFile("server.log", data + "\n", function () {});
    next();
});

app.get("/", function (request, response) {

    response.send("<h1>Главная страница</h1>");
});

app.listen(3000, () => {
    console.log('Сервер запущен и доступен на порту 3000');
    console.log('http://localhost:3000/');
});