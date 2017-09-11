"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var User_1 = require("../models/User");
function getUser(req, res) {
    var userId = res.get("userId");
    var dbquery = User_1.default.findById(userId);
    dbquery
        .exec()
        .then(function (user) {
        res.status(200).json(user);
    })
        .catch(function (error) {
        res.status(500).send(error);
    });
}
exports.getUser = getUser;
function logout(req, res, next) {
    res.clearCookie("jwt");
    return res.sendStatus(200);
}
exports.logout = logout;
//# sourceMappingURL=UserController.js.map