"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var Topic_1 = require("../models/Topic");
var User_1 = require("../models/User");
var mongodb_1 = require("mongodb");
function getAllTopics(req, res) {
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
exports.getAllTopics = getAllTopics;
function getTopicById(req, res) {
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
exports.getTopicById = getTopicById;
function createTopic(req, res) {
    var userId = res.get("userId");
    var originTopic = {
        title: req.body.title,
        description: req.body.description,
        owner: userId,
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
exports.createTopic = createTopic;
function removeTopicAsync(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var _id, userId, dbquery;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _id = req.params.id;
                    userId = res.get("userId");
                    if (!_id || !userId) {
                        return [2 /*return*/, res.status(500).send("topicId or userId can't be null/undefined")];
                    }
                    dbquery = Topic_1.default.findByIdAndRemove(_id);
                    return [4 /*yield*/, dbquery
                            .exec()
                            .then(function (result) { return result; })
                            .catch(function (err) { throw err; })];
                case 1:
                    _a.sent();
                    return [2 /*return*/, res.sendStatus(200)];
            }
        });
    });
}
exports.removeTopicAsync = removeTopicAsync;
function updateTopicAsync(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, _id, title, description, count, userId, topic, originalVoters, originalCount, delta, fake, voters;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = req.body, _id = _a._id, title = _a.title, description = _a.description, count = _a.count;
                    userId = res.get("userId");
                    if (!_id || !userId) {
                        return [2 /*return*/, res.status(500).send("topicId or userId can't be null/undefined")];
                    }
                    return [4 /*yield*/, Topic_1.default.findByIdAndUpdate(_id, {
                            _id: _id,
                            title: title,
                            description: description
                        }, {
                            upsert: true,
                            new: true,
                            setDefaultsOnInsert: true
                        })];
                case 1:
                    topic = _b.sent();
                    if (!topic) {
                        return [2 /*return*/, res.status(500)];
                    }
                    originalVoters = topic.voters;
                    originalCount = originalVoters.length;
                    if (!(count > originalCount)) return [3 /*break*/, 3];
                    delta = count - originalCount;
                    fake = Array(delta).fill("+0");
                    voters = originalVoters.concat(fake);
                    return [4 /*yield*/, Topic_1.default.findByIdAndUpdate(_id, {
                            voters: voters
                        }, {
                            upsert: true,
                            new: true,
                            setDefaultsOnInsert: true
                        })];
                case 2:
                    topic = _b.sent();
                    _b.label = 3;
                case 3: return [2 /*return*/, res.status(200).json(topic)];
            }
        });
    });
}
exports.updateTopicAsync = updateTopicAsync;
function downTopicAsync(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var topicId, isUp, userId, cancelRequest, topic, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    topicId = req.body.topicId;
                    isUp = req.body.isUp;
                    userId = res.get("userId");
                    cancelRequest = false;
                    req.on("close", function () {
                        cancelRequest = true;
                        console.log("request cancelled.");
                    });
                    if (!topicId || !userId) {
                        return [2 /*return*/, res.status(500).send("topicId or userId can't be null/undefined")];
                    }
                    if (cancelRequest) {
                        return [2 /*return*/, res.sendStatus(204)];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, downTopicCoreAsync(topicId, userId, isUp)];
                case 2:
                    topic = _a.sent();
                    return [2 /*return*/, res.status(200).json(topic)];
                case 3:
                    err_1 = _a.sent();
                    return [2 /*return*/, res.status(500).send(err_1)];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.downTopicAsync = downTopicAsync;
function upTopicAsync(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var topicId, isUp, userId, cancelRequest, topic, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    topicId = req.body.topicId;
                    isUp = req.body.isUp;
                    userId = res.get("userId");
                    cancelRequest = false;
                    req.on("close", function () {
                        cancelRequest = true;
                        console.log("request cancelled.");
                    });
                    if (!topicId || !userId) {
                        return [2 /*return*/, res.status(500).send("topicId or userId can't be null/undefined")];
                    }
                    if (cancelRequest) {
                        return [2 /*return*/, res.sendStatus(204)];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, upTopicCoreAsync(topicId, userId, isUp)];
                case 2:
                    topic = _a.sent();
                    return [2 /*return*/, res.status(200).json(topic)];
                case 3:
                    err_2 = _a.sent();
                    return [2 /*return*/, res.status(500).send(err_2)];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.upTopicAsync = upTopicAsync;
function upTopicCoreAsync(topicId, userId, isUp) {
    return __awaiter(this, void 0, void 0, function () {
        var topicIdWithPrefix, userIdWithPrefix, user, topic;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    topicIdWithPrefix = isUp ? "+" + topicId : "-" + topicId;
                    userIdWithPrefix = isUp ? "+" + userId : "-" + userId;
                    return [4 /*yield*/, User_1.default.findByIdAndUpdate(userId, {
                            $addToSet: { votes: topicIdWithPrefix }
                        }, {
                            upsert: true,
                            new: true,
                            setDefaultsOnInsert: true
                        })];
                case 1:
                    user = _a.sent();
                    return [4 /*yield*/, Topic_1.default.findByIdAndUpdate(topicId, {
                            $addToSet: { voters: userIdWithPrefix }
                        }, {
                            upsert: true,
                            new: true,
                            setDefaultsOnInsert: true
                        })];
                case 2:
                    topic = _a.sent();
                    return [2 /*return*/, topic];
            }
        });
    });
}
function downTopicCoreAsync(topicId, userId, isUp) {
    return __awaiter(this, void 0, void 0, function () {
        var topicIdWithPrefix, userIdWithPrefix, user, topic;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    topicIdWithPrefix = isUp ? "+" + topicId : "-" + topicId;
                    userIdWithPrefix = isUp ? "+" + userId : "-" + userId;
                    return [4 /*yield*/, User_1.default.findByIdAndUpdate(userId, {
                            $pop: { votes: topicIdWithPrefix }
                        }, {
                            upsert: true,
                            new: true,
                            setDefaultsOnInsert: true
                        })];
                case 1:
                    user = _a.sent();
                    return [4 /*yield*/, Topic_1.default.findByIdAndUpdate(topicId, {
                            $pull: { voters: userIdWithPrefix }
                        }, {
                            upsert: true,
                            new: true,
                            setDefaultsOnInsert: true
                        })];
                case 2:
                    topic = _a.sent();
                    return [2 /*return*/, topic];
            }
        });
    });
}
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
//# sourceMappingURL=TopicController.js.map