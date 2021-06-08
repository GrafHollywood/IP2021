const Valve = require("../models/valve");
const connection = require("../mode/connection");

function sqlToValve(sqlValve) {
    let valve = new Valve(sqlValve.Model, '', sqlValve.Type_drive, sqlValve.Purpose);
    return valve;
}

/*
../valve
*/
exports.getValves = function (req, res) {
    console.log(`${req.method} getValves`);
    let query = `SELECT Valve_Model.Model, materials.Main_Material, work_env.Pressure, documents.img FROM Valve_Model 
    JOIN materials ON materials.Model = valve_model.Model
    JOIN work_env ON work_env.Model = valve_model.Model
    JOIN documents ON documents.Model = valve_model.Model`;
    connection.query(query, function (err, results) {
        if (err) console.log(err);
        // let valveRes = [];
        // results.forEach(valve => valveRes.push(sqlToValve(valve)));
        res.json(results);
    });
}
/*
../valve/add
*/
exports.addValve = function (req, res) {
    console.log(req.body.text);
    res.json(req.body);
}