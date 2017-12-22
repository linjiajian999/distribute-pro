"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// 复制文件到目录
const fs = require("fs");
const path = require("path");
const enviroment_1 = require("./enviroment");
const read_config_1 = require("./read-config");
const copy_1 = require("./copy");
const backups_file_1 = require("./backups-file");
const remove_1 = require("./remove");
async function removeToTarget() {
    // 先备份
    await backups_file_1.default();
    // 然后复制文件到目标目录
    console.log('备份完成 => 准备删除');
    const configPath = path.resolve(__dirname, '../config.json');
    let target = path.resolve(configPath, read_config_1.default.target[enviroment_1.default]);
    let src = path.resolve(configPath, read_config_1.default.source);
    let lastSrc = '';
    let lastTime = Number.MIN_SAFE_INTEGER;
    // 获取最新的 资源文件夹（在src中可能存在旧的资源文件夹，获取到最新那个
    let srcFiles = [];
    try {
        srcFiles = fs.readdirSync(src);
    }
    catch (err) {
        console.log('config.source 设置错误');
        throw err;
    }
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
    // 删除目标文件夹中的资源文件
    remove_1.default(target).then(() => {
        console.log('删除完成');
        console.log('开始复制');
        // 然后复制资源文件 到 目标目录中
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
