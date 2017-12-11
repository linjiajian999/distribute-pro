"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var read_config_1 = require("./read-config");
var enviroment_1 = require("./enviroment");
var path = require("path");
var fs = require("fs");
var copy_1 = require("./copy");
function backup() {
    var basePath = path.resolve(__dirname, '../');
    var targetPath = path.resolve(basePath, read_config_1.default.target[enviroment_1.default]);
    var bakPath = path.resolve(targetPath + '/bak');
    return new Promise(function (resolve, reject) {
        fs.readdir(bakPath, function (err, files) {
            console.log('备份中...');
            if (err) {
                fs.mkdirSync(bakPath);
            }
            // date
            var date = new Date();
            var bakDatePath = bakPath + "/" + date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
            // 新建 备份文件夹
            fs.mkdirSync(bakDatePath);
            // 开始备份
            copy_1.default(targetPath, bakDatePath).then(function () {
                console.log('备份完成');
                resolve();
            })
                .catch(function (err) {
                reject(err);
            });
        });
    });
}
exports.default = backup;
