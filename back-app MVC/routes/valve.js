const express = require('express');
const valveRouter = express.Router();
const valveController = require('../controllers/valve');

valveRouter.get('/', valveController.getValves);

module.exports = valveRouter;