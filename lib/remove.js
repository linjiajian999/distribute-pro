"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const fs = require("fs");
function remove(src) {
    return new Promise((resolve, reject) => {
        try {
            const files = fs.readdirSync(src);
            files.forEach(file => {
                if (file === 'bak' || file === '.DS_Store' || file.indexOf('base') >= 0) {
                    return;
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
