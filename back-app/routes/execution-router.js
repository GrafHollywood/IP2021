const express = require('express');
const bodyParser = require('body-parser');
const executionRouter = express.Router();
const executionController = require('../controllers/execution-controller');

executionRouter.delete('/delete', executionController.deleteExecution);
executionRouter.get('/:mark?', executionController.getExecutionByMark);
executionRouter.post('/', executionController.postExecution);

module.exports = executionRouter;