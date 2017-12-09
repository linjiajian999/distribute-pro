"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// node
var path_1 = require("path");
var fs_1 = require("fs");
function readConfig() {
    var config = {
        sourcePath: '',
        targetPath: '',
        include: [],
        exclude: []
    };
    console.log(path_1.default);
    // let configStr = getConfigStr()
    return config;
}
function getConfigStr() {
    var configPath = path_1.default.resolve(__dirname, '../config.json');
    var buffer = fs_1.default.readFileSync(configPath);
    var str = buffer.toJSON();
    console.log(str);
    return '';
}
exports.default = readConfig;
