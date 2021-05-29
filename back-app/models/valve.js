const Enviroment = require("./enviroment");
const Execution = require("./execution");
const Materials = require("./materials");

module.exports = class Valve {
    constructor(name, mainMaterial, typeDrive, purpose) {
        this.name = name; //марка клапана
        this.mainMaterial = mainMaterial; //основной материал
        this.partMaterials = new Materials(); //материалы отдельных компонентов
        this.execution = new Execution(); //исполнения
        this.environment = new Enviroment(); //рабочая среда
        this.typeDrive = typeDrive; //тип привода
        this.purpose = purpose; //назначение
    }
}