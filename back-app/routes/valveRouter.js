const express = require('express');
const bodyParser = require('body-parser');
const valveRouter = express.Router();
const valveController = require('../controllers/valveController');

const urlencodedParser = bodyParser.urlencoded({
    extended: false
});

valveRouter.get('/', valveController.getValves);
valveRouter.get('/:mark', valveController.getValveByMark);
valveRouter.post('/', urlencodedParser, valveController.addValve);

module.exports = valveRouter;