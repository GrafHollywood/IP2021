var express = require('express');
var router = express.Router();
const connection = require('../mode/db');

/* GET home page. */
router.get('/', async function (req, res, next) {
  data = await connection.query('SELECT * FROM Valve_Model');
  let obj = {
    titlle: "Hello!",
    text: "Hello world!!!"
  }
  res.send(obj);
});

module.exports = router;