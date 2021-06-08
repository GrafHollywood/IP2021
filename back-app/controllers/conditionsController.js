const connection = require("../mode/connection");
const TightnessClass = require('../models/tightnessClass');

/*
..conditions/tightness
*/
exports.getTightnessClass = function (req, res) {
    console.log(`${req.method} getTightnessClass`);
    connection.query('SELECT Class FROM tightness_class', function (err, results) {
        if (err) console.log(err);
        let tightness = [];
        results.forEach(tClass => {
            tightness.push(tClass.Class)
        })
        res.json(tightness);
    });
}

/*
..conditions/climate
*/
exports.getClimateClass = function (req, res) {
    console.log(`${req.method} getClimateClass`);
    connection.query('SELECT Climate FROM storage_conditions', function (err, results) {
        if (err) console.log(err);
        let climate = [];
        results.forEach(tClass => {
            climate.push(tClass.Climate)
        })
        res.json(climate);
    });
}