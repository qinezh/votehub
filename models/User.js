"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var userSchema = new mongoose.Schema({
    _id: String,
    token: String,
    role: Number,
    votes: Array,
    profile: {
        name: String,
        email: String,
        picture: String
    }
}, { timestamps: true });
var User = mongoose.model("User", userSchema);
exports.default = User;
//# sourceMappingURL=User.js.map