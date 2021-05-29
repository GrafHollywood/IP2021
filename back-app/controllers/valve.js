const Valve = require("../models/valve");
const connection = require("../mode/connection");

function sqlToValve(sqlValve) {
    let valve = new Valve(sqlValve.Model, '', sqlValve.Type_drive, sqlValve.Purpose);
    return valve;
}

// /* GET home page. */
exports.getValves = function (req, res) {
    console.log(req.method);
    connection.query('SELECT * FROM Valve_Model', function (err, results) {
        if (err) console.log(err);
        res.json(sqlToValve(results));
        // console.log(results);
    });
}