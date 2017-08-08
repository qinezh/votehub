"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var crypto = require("crypto");
function encrypt(str) {
    var key = process.env.SECRETKEY;
    return crypto
        .createHash("sha256")
        .update(key || "docascode")
        .update(str)
        .digest("base64");
}
exports.encrypt = encrypt;
function isEncrypt(origin, encryped) {
    return encrypt(origin) === encryped;
}
exports.isEncrypt = isEncrypt;
