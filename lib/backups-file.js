"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var read_config_1 = require("./read-config");
var enviroment_1 = require("./enviroment");
var path = require("path");
var fs = require("fs");
function backup() {
    var targetPath = read_config_1.default.target[enviroment_1.default];
    var bakPath = path.resolve(targetPath + '/bak');
    fs.readdir(bakPath, function (err, files) {
        if (err) {
            fs.mkdirSync(bakPath);
            return;
        }
    });
}
exports.default = backup;
