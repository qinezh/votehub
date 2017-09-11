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
var logStream = fs.createWriteStream(path.join(root, "log.txt"), { flags: 'a' });
try {
    dotenv.config({ path: path.join(root, ".env") });
    mongo.connect(process.env.DBNAME, process.env.DBPORT, process.env.DBPASSWORD);
    logStream.write("mongodb connected successfully.\n");
}
catch (err) {
    logStream.write("dbName: " + process.env.DBNAME + "; dbPORT: " + process.env.DBPORT + "\n");
    logStream.write("mongodb connected failed: " + err + "\n");
}
var strategy = passport_1.getGithubStrategy(process.env.GITHUB_CLIENT_ID, process.env.GITHUB_CLIENT_SECRET, "/auth/github/callback");
app.use(logger("combined", { stream: logStream }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(root, 'dist')));
app.use(passport.initialize());
passport.use(strategy);
app.use(errorHandler());
app.get("/auth/github", passport.authenticate("github", { scope: ["email", "public_profile"] }));
app.get("/auth/github/callback", passport.authenticate("github", { failureRedirect: "/login" }), function (req, res) {
    res.redirect("http://localhost:3000/callback/" + req.user.id);
});
app.use('/api', routes_1.default);
var port = process.env.PORT || '4001';
app.listen(port, function () { return console.log("API running on localhost:" + port); });
//# sourceMappingURL=server.js.map