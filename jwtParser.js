"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jwt = require("jsonwebtoken");
function jwtParser(salt) {
    return function (req, res, next) {
        if (!req.cookies || !req.cookies.jwt) {
            return res.sendStatus(403);
        }
        var jwtToken = req.cookies.jwt;
        jwt.verify(jwtToken, salt, function (err, decode) {
            if (err) {
                console.log("err: " + err);
                return res.sendStatus(403);
            }
            var userId = decode.id;
            if (userId) {
                res.set("userId", userId);
                return next();
            }
            return res.sendStatus(403);
        });
    };
}
exports.default = jwtParser;
//# sourceMappingURL=jwtParser.js.map