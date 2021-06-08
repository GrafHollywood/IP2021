const express = require('express');
const bodyParser = require('body-parser');
const valveRouter = express.Router();
const valveController = require('../controllers/valveController');

const urlencodedParser = bodyParser.urlencoded({
    extended: false
});

valveRouter.get('/', valveController.getValves);
valveRouter.post('/add', urlencodedParser, valveController.addValve);

module.exports = valveRouter;