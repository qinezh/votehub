"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var passport = require("passport");
var passportGithub = require("passport-github");
var User_1 = require("./models/User");
var util_1 = require("./util");
function getGithubStrategy(clientID, clientSecret, callbackURL) {
    if (!clientID || !clientSecret) {
        throw new Error("Can't get GitHub OAuth information.");
    }
    passport.serializeUser(function (user, done) {
        done(undefined, user.id);
    });
    passport.deserializeUser(function (id, done) {
        User_1.default.findById(id, function (err, user) {
            done(err, user || undefined);
        });
    });
    return new passportGithub.Strategy({
        clientID: clientID,
        clientSecret: clientSecret,
        callbackURL: callbackURL
    }, function (accessToken, refreshToken, profile, done) {
        var docquery = User_1.default.findById({ "_id": profile.id });
        docquery
            .exec()
            .then(function (existingUser) {
            if (existingUser) {
                return done(undefined, existingUser);
            }
            var user = new User_1.default();
            user._id = profile.id;
            user.idSign = util_1.encrypt(profile.id);
            user.token = accessToken;
            user.email = profile._json.email;
            user.profile.picture = profile.photos[0].value;
            user.profile.name = "" + profile.username;
            user.save(function (err) {
                return done(err, user);
            });
        })
            .catch(function (error) {
            return done(error);
        });
    });
}
exports.getGithubStrategy = getGithubStrategy;
//# sourceMappingURL=passport.js.map