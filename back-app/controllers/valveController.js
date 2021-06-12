const Valve = require("../models/valve");
const connection = require("../mode/connection");

/*
GET ../valve
*/
exports.getValves = async function (req, res) {
    console.log(`${req.method} getValves`);
    let query = `SELECT Valve_Model.Model, materials.Main_Material, work_env.Pressure, documents.img FROM Valve_Model 
    JOIN materials ON materials.Model = valve_model.Model
    JOIN work_env ON work_env.Model = valve_model.Model
    JOIN documents ON documents.Model = valve_model.Model`;
    let results = await connection.query(query)
    res.status(200).json(results[0]);
}

/*
POST ../valve/
*/
exports.addValve = async function (req, res) {
    console.log(`${req.method} addValve`);
    let requestBody = req.body;
    console.log(requestBody);

    //добавление в таблицу Valve_model
    let query = `INSERT into Valve_model (Model, Purpose, Type_drive) 
        values (?, ?, ?);`;
    let values = [
        requestBody.mark,
        requestBody.purpose,
        requestBody.typeDrive
    ];
    try {
        await connection.query(query, values);
    } catch (error) {
        res.status(400).json(error);
        return;
    }

    //добавление в таблицу Work_Enviroment
    query = `INSERT into Work_Enviroment 
    (Model, Work_Enviroment, t_work_env, t_env, Pressure) 
        values (?, ?, ?, ?, ?);`;
    values = [
        requestBody.mark,
        requestBody.workEnv,
        requestBody.tWork,
        requestBody.tEnv,
        requestBody.pressure
    ];
    try {
        await connection.query(query, values);
    } catch (error) {
        res.status(400).json(error);
        return;
    }

    //добавление в таблицу Materials
    query = `INSERT into Materials 
    (Model, Main_Material, Cap_Material, Body_Material, OilSeal_Material, OilSealPack_Material, Spindle_Material, Sealer_Material, Gasket_Material) 
        values (?,?,?,?,?,?,?,?,?);`;
    values = [
        requestBody.mark,
        requestBody.mainMaterial,
        requestBody.capMaterial,
        requestBody.bodyMaterial,
        requestBody.oilSealMaterial,
        requestBody.oilSealPackMaterial,
        requestBody.spindleMaterial,
        requestBody.sealerMaterial,
        requestBody.gasketMaterial
    ];
    try {
        await connection.query(query, values);
    } catch (error) {
        res.status(400).json(error);
        return;
    }

    //добавление в таблицу climate_conditions
    query = `INSERT into climate_conditions 
    (Model, tightness_class, climate_conditions, warranty_operation, warranty_storage, warranty_time, conservation) 
        values (?,?,?,?,?,?,?,?);`;
    values = [
        requestBody.mark,
        requestBody.tightnessClass,
        requestBody.operatingConditions,
        requestBody.warrantyOperation,
        requestBody.warrantyStorage,
        requestBody.warrantyTime,
        requestBody.conservation,
    ];
    try {
        await connection.query(query, values);
    } catch (error) {
        res.status(400).json(error);
        return;
    }

    //добавление в таблицу Documents
    query = `INSERT into Documents (Model) 
    values (?);`;
    values = [
        requestBody.mark,
    ];
    try {
        await connection.query(query, values);
    } catch (error) {
        res.status(400).json(error);
        return;
    }
    //отправка ответа
    res.json(requestBody);
}
/*
GET ../valve/:mark
*/
exports.getValveByMark = async function (req, res) {
    console.log(`${req.method} getValveByMark`);
    let query = `SELECT * FROM Valve_Model
    JOIN materials ON materials.Model = valve_model.Model
    JOIN work_env ON work_env.Model = valve_model.Model
    JOIN documents ON documents.Model = valve_model.Model
    JOIN operating_conditions ON operating_conditions.Model = valve_model.Model
    WHERE valve_model.Model = ?`;
    console.log(req.params.mark);
    let value = [req.params.mark];
    try {
        let results = await connection.query(query, value);
        res.json(results[0][0]);
    } catch (error) {
        res.json(error);
        return;
    }
}