import * as crypto from "crypto";

export function encrypt(str) {
    return crypto
        .createHash("sha256")
        .update("docascode")
        .update(str)
        .digest("base64");
}

export function isEncrypt(origin, encryped) {
    return encrypt(origin) === encryped;
}