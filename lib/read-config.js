"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// node
var path = require("path");
var fs = require("fs");
var process = require("process");
function getInitialConfig() {
    return {
        source: '',
        target: {
            demo: '',
            real: '',
        },
        include: [],
        exclude: []
    };
}
function readConfig() {
    return getConfigObject();
}
function getConfigObject() {
    var configPath = path.resolve(__dirname, '../config.json');
    var buffer = fs.readFileSync(configPath);
    var str = buffer.toString();
    var config = getInitialConfig();
    try {
        config = JSON.parse(str);
    }
    catch (err) {
        config = getInitialConfig();
        console.log('解析配置文件错，请核对');
        console.log("err: \n " + err);
        process.exit();
    }
    return config;
}
var config = readConfig();
exports.default = config;
