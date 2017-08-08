"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var userSchema = new mongoose.Schema({
    _id: String,
    idSign: String,
    token: String,
    profile: {
        name: String,
        email: String,
        picture: String
    }
}, { timestamps: true });
var User = mongoose.model("User", userSchema);
exports.default = User;
