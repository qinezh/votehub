"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Topic_1 = require("../models/Topic");
var mongodb_1 = require("mongodb");
var util_1 = require("../util");
function getTopics(req, res) {
    var dbquery = Topic_1.default.find({}).read(mongodb_1.ReadPreference.NEAREST);
    dbquery
        .exec()
        .then(function (topics) {
        res.status(200).json(topics);
    })
        .catch(function (error) {
        res.status(500).send(error);
    });
}
exports.getTopics = getTopics;
function getTopic(req, res) {
    var dbquery = Topic_1.default.findById({ "_id": req.params.id });
    dbquery
        .exec()
        .then(function (topic) {
        res.status(200).json(topic);
    })
        .catch(function (error) {
        res.status(500).send(error);
    });
}
exports.getTopic = getTopic;
function postTopic(req, res) {
    var owner = req.body.owner;
    var ownerIdSign = req.body.idSign;
    if (util_1.encrypt(owner) !== ownerIdSign) {
        return res.status(406).send("Invalid user, please re-login.");
    }
    var originTopic = {
        title: req.body.title,
        description: req.body.description,
        owner: owner,
        count: 0,
        voters: []
    };
    var topic = new Topic_1.default(originTopic);
    topic.save(function (error) {
        if (checkServerError(res, error)) {
            return;
        }
        res.status(201).json(topic);
        console.log("Topic created successfully.");
    });
}
exports.postTopic = postTopic;
function putTopic(req, res, next) {
    var topicId = req.body.topicId;
    var userId = req.body.userId;
    var userIdSign = req.body.userIdSign;
    if (!topicId || !userId) {
        return res.status(500).send("topicId or userId can't be null/undefined");
    }
    if (util_1.encrypt(userId) !== userIdSign) {
        return res.status(406).send("Invalid user, please re-login.");
    }
    Topic_1.default.findById({ "_id": topicId }, function (err, existTopic) {
        if (err) {
            console.log(err);
            next(err);
        }
        var topic = existTopic;
        if (!topic.voters || topic.voters.indexOf(userId) != -1) {
            return res.status(406).send("You have already voted for the topic."); // Not Acceptable
        }
        Topic_1.default.update({ "_id": topic.id }, { $inc: { "count": 1 }, $push: { voters: userId } }, function (err) {
            if (err) {
                next(err);
            }
            return res.status(201).send("voting successfully.");
        });
    });
}
exports.putTopic = putTopic;
function checkServerError(res, error) {
    if (error) {
        res.status(500).send(error);
        return error;
    }
}
function checkFound(res, topic) {
    if (!topic) {
        res.status(404).send('Topic not found.');
        return;
    }
    return topic;
}
