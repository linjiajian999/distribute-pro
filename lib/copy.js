"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
// 同步版本
function copyDir(target, bak) {
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
async function copy(target, bak) {
    try {
        const files = await readdir(target);
        for (let i = 0; i < files.length; i++) {
            let file = files[i];
            if (file === '.DS_Store' || file === 'bak') {
                continue;
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
