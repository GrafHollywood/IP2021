const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));


const valveRouter = require('./routes/valve-router'); //для адресов /valve
const conditionsRouter = require('./routes/conditions-router');
const executionRouter = require('./routes/execution-router');
app.use('/api/v1/valve', valveRouter);
app.use('/api/v1/conditions', conditionsRouter);
app.use('/api/v1/execution', executionRouter);

// обработка ошибки 404
app.use(function (req, res, next) {
    res.status(404).send("Not Found")
});

app.listen(3000, () => {
    console.log('http://localhost:3000');
});