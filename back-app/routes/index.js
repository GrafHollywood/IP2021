var express = require('express');
var router = express.Router();
const connection = require('../mode/db');

/* GET home page. */
router.get('/', async function (req, res, next) {
  data = await connection.query('SELECT * FROM Valve_Model');
  console.log(data[0]);
  res.send(data[0]);
});

module.exports = router;