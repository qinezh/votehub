"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var TopicController = require("./controllers/TopicController");
var UserController = require("./controllers/UserController");
var router = express.Router();
router.get("/users", function (req, res) {
});
router.get("/user/:id", function (req, res) {
    UserController.getUser(req, res);
});
router.get("/topics", function (req, res) {
    TopicController.getTopics(req, res);
});
router.get("/topic/:id", function (req, res) {
    TopicController.getTopic(req, res);
});
router.post("/topic", function (req, res) {
    TopicController.postTopic(req, res);
});
router.put("/topic", function (req, res, next) {
    TopicController.putTopic(req, res, next);
});
exports.default = router;
