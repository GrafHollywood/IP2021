const Valve = require("../models/valve");
const connection = require("../mode/connection");

function sqlToValve(sqlValve) {
    let valve = new Valve(sqlValve.Model, '', sqlValve.Type_drive, sqlValve.Purpose);
    return valve;
}

// /* Получить список всех клапанов. */
exports.getValves = function (req, res) {
    console.log(`${req.method} getValves`);
    connection.query('SELECT * FROM Valve_Model', function (err, results) {
        if (err) console.log(err);
        let valveRes = [];
        results.forEach(valve => valveRes.push(sqlToValve(valve)));
        res.json(valveRes);
    });
}

exports.getTightnessClass = function (req, res) {
    console.log(`${req.method} getTightnessClass`);

}