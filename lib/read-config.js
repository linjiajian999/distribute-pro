"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// node
const path = require("path");
const fs = require("fs");
const process = require("process");
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
    let configPath = path.resolve(__dirname, '../config.json');
    let buffer = fs.readFileSync(configPath);
    let str = buffer.toString();
    let config = getInitialConfig();
    try {
        config = JSON.parse(str);
    }
    catch (err) {
        config = getInitialConfig();
        console.log('解析配置文件错，请核对');
        console.log(`err: \n ${err}`);
        process.exit();
    }
    return config;
}
let config = readConfig();
exports.default = config;
