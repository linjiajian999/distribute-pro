"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
const enviroment_1 = require("./enviroment");
const read_config_1 = require("./read-config");
const copy_1 = require("./copy");
const backups_file_1 = require("./backups-file");
const remove_1 = require("./remove");
async function removeToTarget() {
    await backups_file_1.default();
    const configPath = path.resolve(__dirname, '../config.json');
    const target = path.resolve(configPath, read_config_1.default.target[enviroment_1.default]);
    const src = path.resolve(configPath, read_config_1.default.source);
    let lastSrc = '';
    let lastTime = Number.MIN_SAFE_INTEGER;
    const srcFiles = fs.readdirSync(src);
    srcFiles.forEach(srcfile => {
        const srcfiledir = src + '/' + srcfile;
        const stats = fs.statSync(srcfiledir);
        stats.birthtime;
        if (stats.birthtime.getTime() > lastTime) {
            lastSrc = srcfiledir;
            lastTime = stats.birthtime.getTime();
        }
        lastSrc = src + '/' + srcfile;
    });
    console.log('开始删除');
    remove_1.default(target).then(() => {
        console.log('删除完成');
        console.log('开始复制');
        copy_1.default(lastSrc, target);
    })
        .then(() => {
        console.log('复制完成');
    })
        .catch(err => {
        console.log('error');
        console.log(err);
    });
}
exports.default = removeToTarget;
