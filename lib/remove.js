"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
var fs = require("fs");
function remove(src) {
    return new Promise(function (resolve, reject) {
        try {
            var files = fs.readdirSync(src);
            files.forEach(function (file) {
                if (file === 'bak' || file === '.DS_Store' || file.indexOf('base') >= 0) {
                    return;
                }
                var filePath = path.resolve(src, file);
                var stats = fs.statSync(filePath);
                if (stats.isDirectory()) {
                    console.log("remove: " + filePath);
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
