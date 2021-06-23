const express = require('express');
const bodyParser = require('body-parser');
const valveRouter = express.Router();
const valveController = require('../controllers/valve-controller');

const urlencodedParser = bodyParser.urlencoded({
    extended: false
});

valveRouter.get('/', valveController.getValves);
valveRouter.get('/short', valveController.getValvesShort);
valveRouter.get('/env', valveController.getValveWorkEnv);
valveRouter.get('/filter', valveController.getValveFilter);
valveRouter.get('/:mark', valveController.getValveByMark);
valveRouter.delete('/:mark', valveController.deleteValve)
valveRouter.post('/', urlencodedParser, valveController.addValve);

module.exports = valveRouter;