"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var topicSchema = new mongoose.Schema({
    title: String,
    description: String,
    owner: String,
    voters: Array
}, {
    collection: "topics",
    read: "nearest",
    timestamps: true
});
var Topic = mongoose.model("Topic", topicSchema);
exports.default = Topic;
//# sourceMappingURL=Topic.js.map