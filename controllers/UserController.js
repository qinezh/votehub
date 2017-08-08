"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var User_1 = require("../models/User");
function getUser(req, res) {
    console.log(req.body.id);
    var dbquery = User_1.default.findById({ "_id": req.params.id });
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
