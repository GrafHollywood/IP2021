const connection = require("../mode/connection");

/*..conditions/tightness*/
exports.getTightnessClass = async function (req, res) {
    let results = await connection.query('SELECT Class FROM tightness_class');
    let tightness = [];
    results[0].forEach(tClass => {
        tightness.push(tClass.Class)
    })
    res.json(tightness);
}
/*..conditions/climate*/
exports.getClimateClass = async function (req, res) {
    let results = await connection.query('SELECT Climate FROM storage_conditions');
    let climate = [];
    results[0].forEach(tClass => {
        climate.push(tClass.Climate)
    })
    res.json(climate);
}