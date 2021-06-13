const connection = require('../mode/connection');

exports.getExecutionByMark = async function (req, res) {
    let value = [req.params.mark];
    let query = `SELECT * FROM Execution
        WHERE Model = ?`;
    try {
        let results = await connection.query(query, value);
        res.json(results[0][0]);
    } catch (error) {
        res.json(error);
    }
}

exports.postExecution = async function (req, res) {
    let requestBody = req.body;
    let query = `INSERT into Valve_model (Execution, Model, D, L, H, Type_connect, n_connect, d_connect, D1_connect, D2_connect, Weight) 
    values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    let value = [
        `${requestBody.mark}-${requestBody.d}`,
        requestBody.mark,
        requestBody.d,
        requestBody.l,
        requestBody.h,
        requestBody.Type_connect,
        requestBody.n_connect,
        requestBody.d_connect,
        requestBody.D1_connect,
        requestBody.D2_connect,
        requestBody.Weight,
    ];
    try {
        await connection.query(query, value);
        res.json({
            succes: true
        });
    } catch (error) {
        res.json(error);
    }
}