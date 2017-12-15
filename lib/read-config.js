"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// node
const process = require("process");
let configjson = require('../config.json');
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
    let config = getInitialConfig();
    if (typeof configjson === 'object') {
        config = configjson;
    }
    else {
        config = getInitialConfig();
        console.log('解析配置文件错，请核对');
        process.exit();
    }
    return config;
}
let config = readConfig();
exports.default = config;
