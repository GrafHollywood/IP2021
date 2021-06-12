const Valve = require("../models/valve");
const connection = require("../mode/connection");

/*
GET ../valve
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
POST ../valve/
*/
exports.addValve = function (req, res) {
    console.log(`${req.method} addValve`);
    let requestBody = req.body;
    console.log(requestBody);

    let query = `INSERT into Valve_model (Model, Purpose, Type_drive) 
        values (?, ?, ?);`;
    let values = [requestBody.mark, requestBody.purpose, requestBody.typeDrive];

    connection.query(query, values, (err, results) => {
        if (err) {
            res.status(400).json(err);
            return;
        }
        res.json(requestBody);
    });
}
/*
GET ../valve/:mark
*/
exports.getValveByMark = function (req, res) {
    console.log(`${req.method} getValveByMark`);
    let query = `SELECT * FROM Valve_Model
    JOIN materials ON materials.Model = valve_model.Model
    JOIN work_env ON work_env.Model = valve_model.Model
    JOIN documents ON documents.Model = valve_model.Model
    JOIN operating_conditions ON operating_conditions.Model = valve_model.Model
    WHERE valve_model.Model = ?`;
    console.log(req.params.mark);
    let value = [req.params.mark];

    connection.query(query, value, function (err, results) {
        if (err || results.length == 0) {
            res.status(400).json(err);
            return;
        }
        res.json(results[0]);
    });
}