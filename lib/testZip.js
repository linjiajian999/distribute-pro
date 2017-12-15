"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zlib = require("zlib");
const path = require("path");
const fs = require("fs");
const srcZipPath = path.resolve(__dirname, '../../dis-test-src/20171211.zip');
const udZipPath = path.resolve(__dirname, '../../dis-test-src/20171211');
const inp = fs.createReadStream(srcZipPath);
const out = fs.createWriteStream(udZipPath);
const unzip = zlib.createUnzip();
// try {
//   inp.pipe(unzip).pipe(out)
// } catch (err) {
//   console.log(err)
// } 
