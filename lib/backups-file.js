"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// 备份文件
const read_config_1 = require("./read-config");
const enviroment_1 = require("./enviroment");
const path = require("path");
const fs = require("fs");
const copy_1 = require("./copy");
function backup() {
    const configPath = path.resolve(__dirname, '../config.json');
    const targetPath = path.resolve(configPath, read_config_1.default.target[enviroment_1.default]);
    const bakPath = path.resolve(targetPath + '/bak');
    return new Promise((resolve, reject) => {
        fs.readdir(bakPath, function (err, files) {
            console.log('备份中...');
            if (err) {
                fs.mkdirSync(bakPath);
            }
            // date
            let date = new Date();
            const bakDatePath = `${bakPath}/${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
            // 新建 备份文件夹
            fs.mkdirSync(bakDatePath);
            // 开始备份
            const include = [];
            const exclude = [];
            copy_1.default(targetPath, bakDatePath, include, exclude).then(() => {
                console.log('备份完成');
                resolve();
            })
                .catch(err => {
                reject(err);
            });
        });
    });
}
exports.default = backup;
