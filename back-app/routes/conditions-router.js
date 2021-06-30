const express = require('express');
const conditionsRouter = express.Router();
const conditionsController = require('../controllers/conditions-controller');

conditionsRouter.get('/tightness', conditionsController.getTightnessClass);
conditionsRouter.get('/climate', conditionsController.getClimateClass);

module.exports = conditionsRouter;