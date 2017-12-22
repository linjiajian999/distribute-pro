"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const fs = require("fs");
const read_config_1 = require("./read-config");
function remove(src) {
    return new Promise((resolve, reject) => {
        try {
            const files = fs.readdirSync(src);
            files.forEach(file => {
                if (file === 'bak' || file === '.DS_Store' || /base(.)+\.js/.test(file)) {
                    return;
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
                const filePath = path.resolve(src, file);
                const stats = fs.statSync(filePath);
                if (stats.isDirectory()) {
                    console.log(`remove: ${filePath}`);
                    remove(filePath);
                    fs.rmdirSync(filePath);
                    return;
                }
                else {
                    fs.unlinkSync(filePath);
                }
            });
            resolve();
        }
        catch (err) {
            reject(err);
        }
    });
}
exports.default = remove;
