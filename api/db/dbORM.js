var orm = require("orm");
var path = require('path');
var configFile = '../config/db.json';
var opts = require(configFile);

module.exports.setup = async () => {
    this.db = await orm.connectAsync(opts);
    console.log("Connected To Database");
};