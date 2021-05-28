const Connect = require("./connect");

module.exports = class Execution {
    constructor() {
        this.D = 0;
        this.L = 0;
        this.H = 0;
        this.weight = 0;
        this.connect = new Connect();
    }
}