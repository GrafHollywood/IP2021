const connection = require('../mode/connection');

exports.getExecutionByMark = async function (req, res) {
    let value = [req.params.mark];
    let query = `SELECT D, L, H, Type_connect, n_connect, d_connect, D1_connect, D2_connect, Weight FROM Execution
        WHERE Model = ?`;
    try {
        let results = await connection.query(query, value);
        res.json(results[0]);
    } catch (error) {
        res.status(404).json(error);
    }
}

exports.deleteExecution = async function (req, res) {
    const queryParam = req.query;
    try {
        await connection.query(`DELETE FROM Execution WHERE Execution.Model = ? AND Execution.D = ?`, [queryParam.model, queryParam.DN]);
        res.status(200).json({
            succes: true
        });
    } catch (error) {
        res.status(404).json(error);
    }
}
exports.editExecution = async function (req, res) {
    let requestBody = req.body;
    try {
        await connection.query(`UPDATE execution SET 
        L = ?, H = ?, 
        Type_connect = ?, 
        n_connect = ?, 
        d_connect = ?, 
        D1_connect = ?, 
        D2_connect = ?, 
        Weight = ? 
        WHERE Model=? AND D=?`, [
            requestBody.L,
            requestBody.H,
            requestBody.Type_connect,
            requestBody.n_connect,
            requestBody.d_connect,
            requestBody.D1_connect,
            requestBody.D2_connect,
            requestBody.Weight,
            requestBody.Model,
            requestBody.DN,
        ]);
        res.status(200).json({
            succes: true
        });
    } catch (error) {
        res.status(404).json(error);
    }
}
exports.postExecution = async function (req, res) {
    let requestBody = req.body;
    let query = `INSERT into Execution (Execution, Model, D, L, H, Type_connect, n_connect, d_connect, D1_connect, D2_connect, Weight) 
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
        res.status(200).json({
            succes: true
        });
    } catch (error) {
        res.status(400).json(error);
    }
}