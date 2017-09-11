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
var axios_1 = require("axios");
var User_1 = require("../models/User");
var url = require("url");
var querystring = require("querystring");
var jwt = require("jsonwebtoken");
function getOauthAsync(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var jwtToken, decode, id, name, picture, role, user, clientUrl_1, err_1, clientUrl, clientId, state, redirectUrl, url;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(req.cookies && req.cookies.jwt)) return [3 /*break*/, 4];
                    jwtToken = req.cookies.jwt;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    decode = jwt.verify(jwtToken, "secret");
                    id = decode.id, name = decode.name, picture = decode.picture, role = decode.role;
                    return [4 /*yield*/, User_1.default.findById(id)];
                case 2:
                    user = _a.sent();
                    if (user) {
                        clientUrl_1 = req.query.redirect_url;
                        return [2 /*return*/, res.redirect(clientUrl_1)];
                    }
                    return [3 /*break*/, 4];
                case 3:
                    err_1 = _a.sent();
                    console.log("Error: ", err_1);
                    return [3 /*break*/, 4];
                case 4:
                    clientUrl = req.query.redirect_url;
                    clientId = encodeURIComponent("97c0a628cd5c54f1d779");
                    state = clientUrl;
                    redirectUrl = encodeURIComponent("http://localhost:4001/api/auth/github/callback");
                    url = "https://github.com/login/oauth/authorize?client_id=" + clientId + "&redirect_url=" + redirectUrl + "&state=" + state;
                    res.redirect(url);
                    return [2 /*return*/];
            }
        });
    });
}
exports.getOauthAsync = getOauthAsync;
function getOauthCallbackAsync(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var query, code, tokenUrl, token, profileUrl, profile, id, dbquery, user, role, jwtToken;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = url.parse(req.url, true).query;
                    code = query.code;
                    console.log(query);
                    tokenUrl = "https://github.com/login/oauth/access_token";
                    return [4 /*yield*/, axios_1.default
                            .post(tokenUrl, {
                            "client_id": "97c0a628cd5c54f1d779",
                            "client_secret": "42b34eb3c8c694df5302fff9111bf1cdae52cf07",
                            "code": code
                        })
                            .then(function (response) {
                            var query = querystring.parse(response.data);
                            return query.access_token;
                        })
                            .catch(function (err) {
                            console.log(err);
                        })];
                case 1:
                    token = _a.sent();
                    profileUrl = "https://api.github.com/user";
                    return [4 /*yield*/, axios_1.default
                            .get(profileUrl, {
                            headers: {
                                "Authorization": "token " + token
                            }
                        })
                            .then(function (response) { return response.data; })
                            .catch(function (err) { return console.log(err); })];
                case 2:
                    profile = _a.sent();
                    id = profile.id;
                    dbquery = User_1.default.findByIdAndUpdate(id, {
                        _id: id,
                        token: token,
                        profile: {
                            name: profile.login,
                            email: profile.email,
                            picture: profile.avatar_url
                        }
                    }, {
                        upsert: true,
                        new: true,
                        setDefaultsOnInsert: true
                    });
                    return [4 /*yield*/, dbquery
                            .exec()
                            .then(function (result) {
                            return result;
                        })
                            .catch(function (err) {
                            throw err;
                        })];
                case 3:
                    user = _a.sent();
                    role = user.role || 0;
                    jwtToken = jwt.sign({
                        id: user._id,
                        name: user.profile.name,
                        role: role,
                        picture: user.profile.picture
                    }, "secret");
                    res.cookie("jwt", jwtToken, { maxAge: 9000000, httpOnly: true });
                    res.redirect(query.state);
                    return [2 /*return*/];
            }
        });
    });
}
exports.getOauthCallbackAsync = getOauthCallbackAsync;
//# sourceMappingURL=OauthController.js.map