module.exports = class Enviroment {
    constructor() {
        this.environment = ''; //рабочая среда
        this.pressure = 0; //номинальное давление
        this.tWork = ''; //температура рабочей среды
        this.tEnv = ''; //температура окружающей среды
    }
}