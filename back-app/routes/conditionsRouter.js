const express = require('express');
const bodyParser = require('body-parser');
const conditionsRouter = express.Router();
const conditionsController = require('../controllers/conditionsController');

const urlencodedParser = bodyParser.urlencoded({
    extended: false
});

conditionsRouter.get('/tightness', conditionsController.getTightnessClass);
conditionsRouter.get('/climate', conditionsController.getClimateClass);

module.exports = conditionsRouter;