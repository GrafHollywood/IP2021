const Enviroment = require("./enviroment");
const Execution = require("./execution");
const Materials = require("./materials");

module.exports = class Valve {
    constructor() {
        this.name = ''; //марка клапана
        this.mainMaterial = ''; //основной материал
        this.partMaterials = new Materials(); //материалы отдельных компонентов
        this.execution = new Execution(); //исполнения
        this.environment = new Enviroment(); //рабочая среда
        this.typeDrive = ''; //тип привода
        this.purpose = ''; //назначение
    }
}