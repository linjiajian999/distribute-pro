"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
const read_config_1 = require("./read-config");
// 同步版本
function copyDir(target, bak, include, exclude) {
    return new Promise((resolve, reject) => {
        try {
            let files = fs.readdirSync(target);
            files.forEach((file) => {
                if (file === '.DS_Store' || file === 'bak') {
                    return;
                }
                let bakFile = bak + '/' + file;
                let src = path.resolve(target, file);
                fs.copyFileSync(src, bakFile);
                console.log('复制成功：' + src);
                const stats = fs.statSync(src);
                if (stats.isDirectory()) {
                    copyDir(src, bakFile);
                }
            });
            resolve();
        }
        catch (err) {
            reject(err);
        }
    });
}
// 异步版本
async function copy(target, bak, include, exclude) {
    try {
        const files = await readdir(target);
        for (let i = 0; i < files.length; i++) {
            let file = files[i];
            if (file === '.DS_Store' || file === 'bak') {
                continue;
            }
            if (read_config_1.default.include.length > 0) {
                const include = read_config_1.default.include;
                for (let value of include) {
                    if (file.indexOf(value) < 0) {
                        return;
                    }
                }
            }
            if (read_config_1.default.exclude.length > 0) {
                const exclude = read_config_1.default.exclude;
                for (let value of exclude) {
                    if (file.indexOf(value) >= 0) {
                        return;
                    }
                }
            }
            // console.log(`${i}:${file}`)
            let bakFile = bak + '/' + file;
            let src = path.resolve(target, file);
            await copyFile(src, bakFile);
            const stats = await stat(src, bakFile);
            if (stats.isDirectory()) {
                await copy(src, bakFile);
            }
        }
        console.log(`done: ${target}`);
    }
    catch (err) {
        console.log('error:');
        console.log(err);
    }
}
exports.default = copy;
function readdir(target) {
    return new Promise((resolve, reject) => {
        fs.readdir(target, (err, files) => {
            if (err) {
                reject(err);
            }
            resolve(files);
        });
    });
}
function copyFile(src, bakFile) {
    return new Promise((resolve, reject) => {
        fs.copyFile(src, bakFile, (err) => {
            if (err) {
                reject(err);
                return;
            }
            resolve();
        });
    });
}
function stat(src, bakFile) {
    return new Promise((resolve, reject) => {
        fs.stat(src, (err, stats) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(stats);
        });
    });
}
