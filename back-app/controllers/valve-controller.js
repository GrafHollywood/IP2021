const connection = require("../mode/connection");


// GET ../valve
exports.getValves = async function (req, res) {
    let query = `SELECT * FROM Valve_Model 
    JOIN materials ON materials.Model = valve_model.Model
    JOIN Work_Enviroment ON Work_Enviroment.Model = valve_model.Model
    JOIN documents ON documents.Model = valve_model.Model`;
    let results = (await connection.query(query))[0];
    let execution = (await connection.query('SELECT Model, D FROM execution'))[0];
    execution.forEach(item => {
        let i = results.findIndex(valve => valve.Model == item.Model);
        if (!('DN' in results[i])) {
            results[i]['DN'] = [];
        }
        results[i].DN.push(item.D);
    });
    res.status(200).json(results);
}

// GET ../valve/:mark
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

// GET ..valve/short
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

//GET ..valve/env
exports.getValveWorkEnv = async function (req, res) {
    let query = `SELECT Work_Enviroment FROM work_enviroment group by Work_Enviroment`;
    try {
        let results = await connection.query(query);
        res.json(results[0].map(item => item.Work_Enviroment));
    } catch (error) {
        res.json(error);
        return;
    }
}

// GET ..valve/filter
exports.getValveFilter = async function (req, res) {
    const queryParam = req.query;
    console.log(queryParam);
    const query = `SELECT Valve_Model.Model, materials.Main_Material, Work_Enviroment.Pressure, documents.img FROM Valve_Model
        JOIN materials ON 
            materials.Main_Material = '${queryParam.material}' 
            AND materials.Model = Valve_Model.Model
        JOIN work_enviroment ON 
            work_enviroment.t_env_max >= ${queryParam.tEnw} 
            AND work_enviroment.t_env_min <= ${queryParam.tEnw} 
            AND work_enviroment.Work_Enviroment = '${queryParam.workEnv}' 
            AND work_enviroment.Pressure = ${queryParam.PN}
            AND work_enviroment.Model = Valve_Model.Model
        JOIN documents ON 
            documents.Model = valve_model.Model
        JOIN execution ON 
            execution.D = ${queryParam.DN}
            AND execution.Type_connect = '${queryParam.typeConnect}'
            AND execution.Model = valve_model.Model
        JOIN operating_conditions ON 
            operating_conditions.climate_conditions = '${queryParam.climateCondition}'
            AND operating_conditions.tightness_class = '${queryParam.classTightness}'
            AND operating_conditions.Model = valve_model.Model;`
    try {
        let results = (await connection.query(query))[0];
        let execution = (await connection.query('SELECT Model, D FROM execution'))[0];
        // console.log(execution)
        execution.forEach(item => {
            let i = results.findIndex(valve => valve.Model == item.Model);
            if (i != -1) {
                if (!('DN' in results[i])) {
                    results[i]['DN'] = [];
                }
                results[i].DN.push(item.D);
            }
        });
        res.status(200).json(results);
    } catch (error) {
        res.status(404).json(error);
        return;
    }
}

// DELETE ../valve/:mark
exports.deleteValve = async function (req, res) {
    const mark = req.params.mark;
    try {
        await connection.query(`DELETE FROM materials WHERE materials.Model = ?`, [mark]);
        await connection.query(`DELETE FROM work_enviroment WHERE work_enviroment.Model = ?`, [mark]);
        await connection.query(`DELETE FROM documents WHERE documents.Model = ?`, [mark]);
        await connection.query(`DELETE FROM operating_conditions WHERE operating_conditions.Model = ?`, [mark]);
        await connection.query(`DELETE FROM execution WHERE execution.Model = ?`, [mark]);
        await connection.query(`DELETE FROM Valve_Model WHERE Valve_Model.Model = ?`, [mark]);
        res.status(200).json({
            succes: true
        });
    } catch (error) {
        res.status(404).json(error);
        return;
    }
}

// PUT ../valve/:mark
exports.updateValve = async function (req, res) {
    const mark = req.params.mark;
    const values = req.body;
    try {
        await connection.query(`UPDATE valve_model SET Purpose=?, Type_drive=? WHERE Model=?`, [values.purpose, values.typeDrive, mark]);
        await connection.query(`UPDATE materials SET 
        Main_Material = ?, 
        Cap_Material = ?, 
        Body_Material = ?, 
        OilSeal_Material = ?, 
        OilSealPack_Material = ?, 
        Spindle_Material = ?, 
        Sealer_Material = ?, 
        Gasket_Material = ? 
        WHERE Model=?`, [
            values.mainMaterial,
            values.capMaterial,
            values.bodyMaterial,
            values.oilSealMaterial,
            values.oilSealPackMaterial,
            values.spindleMaterial,
            values.sealerMaterial,
            values.gasketMaterial,
            mark
        ]);
        await connection.query(`UPDATE work_enviroment SET 
        Work_Enviroment = ?, 
        t_work_env_max = ?, 
        t_work_env_min = ?, 
        t_env_max = ?, 
        t_env_min = ?, 
        Pressure = ? 
        WHERE Model=?`, [
            values.workEnv,
            values.tWorkMax,
            values.tWorkMin,
            values.tEnvMax,
            values.tEnvMin,
            values.pressure,
            mark
        ]);
        await connection.query(`UPDATE operating_conditions SET 
        tightness_class = ?, 
        climate_conditions = ?, 
        warranty_operation = ?, 
        warranty_storage = ?, 
        warranty_time = ?, 
        conservation = ? 
        WHERE Model=?`, [
            values.tightnessClass,
            values.operatingConditions,
            values.warrantyOperation,
            values.warrantyStorage,
            values.warrantyTime,
            values.conservation,
            mark
        ]);

        await connection.query(`UPDATE documents SET img =? WHERE Model=?`, [values.img, mark]);

        res.status(200).json({
            succes: true
        });
    } catch (error) {
        res.status(404).json(error);
        return;
    }
}

// POST ../valve/
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