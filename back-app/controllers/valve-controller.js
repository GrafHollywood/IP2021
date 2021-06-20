const Valve = require("../models/valve");
const connection = require("../mode/connection");

/*
GET ../valve
*/
exports.getValves = async function (req, res) {
    let query = `SELECT Valve_Model.Model, materials.Main_Material, Work_Enviroment.Pressure, documents.img FROM Valve_Model 
    JOIN materials ON materials.Model = valve_model.Model
    JOIN Work_Enviroment ON Work_Enviroment.Model = valve_model.Model
    JOIN documents ON documents.Model = valve_model.Model`;
    let results = (await connection.query(query))[0];
    let execution = (await connection.query('SELECT Model, D FROM engineering_project.execution'))[0];
    execution.forEach(item => {
        let i = results.findIndex(valve => valve.Model == item.Model);
        if (!('DN' in results[i])) {
            results[i]['DN'] = [];
        }
        results[i].DN.push(item.D);
    });
    res.status(200).json(results);
}

/*
POST ../valve/
*/
exports.addValve = async function (req, res) {
    let requestBody = req.body;

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
        res.json({
            succes: true
        });
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
        return;
    }

    //добавление в таблицу Work_Enviroment
    query = `INSERT into Work_Enviroment 
    (Model, Work_Enviroment, t_work_env_min, t_work_env_max, t_env_min, t_env_max, Pressure) 
        values (?, ?, ?, ?, ?, ?, ?);`;
    values = [
        requestBody.mark,
        requestBody.workEnv,
        requestBody.tWorkMin,
        requestBody.tWorkMax,
        requestBody.tEnvMin,
        requestBody.tEnvMax,
        requestBody.pressure
    ];
    try {
        await connection.query(query, values);
    } catch (error) {
        console.log(error);
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
        console.log(error);
        res.status(400).json(error);
        return;
    }

    //добавление в таблицу operating_conditions
    query = `INSERT into operating_conditions 
    (Model, tightness_class, climate_conditions, warranty_operation, warranty_storage, warranty_time, conservation) 
        values (?,?,?,?,?,?,?);`;
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
        console.log(error);
        res.status(400).json(error);
        return;
    }

    //добавление в таблицу Documents
    query = `INSERT into Documents (Model, img) 
    values (?, ?);`;
    values = [
        requestBody.mark,
        requestBody.img
    ];
    try {
        await connection.query(query, values);
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
        return;
    }
    //отправка ответа
    res.status(200).json({
        succes: true
    });
}
/*
GET ../valve/:mark
*/
exports.getValveByMark = async function (req, res) {
    let query = `SELECT * FROM Valve_Model
    JOIN materials ON materials.Model = valve_model.Model
    JOIN Work_Enviroment ON Work_Enviroment.Model = valve_model.Model
    JOIN documents ON documents.Model = valve_model.Model
    JOIN operating_conditions ON operating_conditions.Model = valve_model.Model
    WHERE valve_model.Model = ?`;
    let value = [req.params.mark];
    try {
        let results = await connection.query(query, value);
        res.json(results[0][0]);
    } catch (error) {
        res.json(error);
        return;
    }
}

exports.getValvesShort = async function (req, res) {
    let query = `SELECT Model FROM Valve_Model`;
    try {
        let results = await connection.query(query);
        res.json(results[0].map(item => item.Model));
    } catch (error) {
        res.json(error);
        return;
    }
}