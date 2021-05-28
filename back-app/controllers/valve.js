const Valve = require("../models/valve");

exports.getValves = function (req, res) {
    console.log(`${req.method} ${req.baseUrl}`);

    let valve = new Valve();
    valve.name = "15кч12";
    valve.mainMaterial = 'сталь'; //основной материал
    valve.partMaterials = null; //материалы отдельных компонентов
    valve.execution = null; //исполнения
    valve.environment = null; //рабочая среда
    valve.typeDrive = 'тип привода'; //тип привода
    valve.purpose = 'назначение'; //назначение

    res.json(valve);
}
// /* GET home page. */
// router.get('/', async function (req, res, next) {
//     data = await connection.query('SELECT * FROM Valve_Model');
//     res.send(data[0]);
// });