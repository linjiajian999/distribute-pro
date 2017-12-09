"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var process = require("process");
var selfEnv = '';
var runEnv = process.argv[2];
if (runEnv) {
    selfEnv = runEnv;
}
else {
    selfEnv = 'demo';
}
exports.default = selfEnv;
