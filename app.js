"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var bodyParser = require("body-parser");
var dotenv = require("dotenv");
var errorHandler = require("errorhandler");
var logger = require("morgan");
var passport = require("passport");
var fs = require("fs");
var path = require("path");
var routes_1 = require("./routes");
var mongo = require("./mongo");
var passport_1 = require("./passport");
var root = __dirname;
var app = express();
dotenv.config({ path: path.join(root, ".env") });
var environment = process.env.NODE_ENV;
if (!environment || environment.toLowerCase() !== "production") {
    console.log("run as dev mode");
    app.use(logger("dev"));
    app.use(errorHandler());
}
else {
    var logStream = fs.createWriteStream(path.join(root, "morgan.log"), { flags: 'a' });
    app.use(logger("combined", { stream: logStream }));
}
mongo.connect(process.env.DBNAME, process.env.DBPORT, process.env.DBPASSWORD);
var strategy = passport_1.getGithubStrategy(process.env.GITHUB_CLIENT_ID, process.env.GITHUB_CLIENT_SECRET, "/auth/github/callback");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(express.static(path.join(root, 'build')));
app.use(passport.initialize());
passport.use(strategy);
app.get("/auth/github", passport.authenticate("github", { scope: ["email", "public_profile"] }));
app.get("/auth/github/callback", passport.authenticate("github", { failureRedirect: "/login" }), function (req, res) {
    if (!req.user || !req.user.id) {
        console.log("req.user.id can't be null/undefined, " + req + ".");
        res.status(500).send("Something wrong while oauth.");
    }
    res.redirect("/callback/" + req.user.id);
});
app.use('/api', routes_1.default);
app.get("*", function (req, res) { return res.sendFile(path.resolve(root, "index.html")); });
var port = process.env.PORT || '4000';
app.listen(port, function () { return console.log("API running on localhost:" + port); });
