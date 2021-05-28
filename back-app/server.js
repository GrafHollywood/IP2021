const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());
// app.use(bodyParser.urlencoded({
//     extended: true
// }));


const valveRouter = require('./routes/valve'); //для адресов /valve
app.use('/valve', valveRouter);

// обработка ошибки 404
app.use(function (req, res, next) {
    res.status(404).send("Not Found")
});

app.listen(3000, () => {
    console.log('http://localhost:3000');
});