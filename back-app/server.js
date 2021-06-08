const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());


const valveRouter = require('./routes/valveRouter'); //для адресов /valve
const conditionsRouter = require('./routes/conditionsRouter')
app.use('/api/v1/valve', valveRouter);
app.use('/api/v1//conditions', conditionsRouter);

// обработка ошибки 404
app.use(function (req, res, next) {
    res.status(404).send("Not Found")
});

app.listen(3000, () => {
    console.log('http://localhost:3000');
});