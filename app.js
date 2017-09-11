"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var dotenv = require("dotenv");
var errorHandler = require("errorhandler");
var logger = require("morgan");
var fs = require("fs");
var path = require("path");
var routes_1 = require("./routes");
var mongo = require("./mongo");
var root = __dirname;
var app = express();
dotenv.config({ path: path.join(root, ".env") });
if (process.env.NODE_ENV === "dev") {
    console.log("run as dev mode");
    app.use(logger("dev"));
    app.use(errorHandler());
}
else {
    var logStream = fs.createWriteStream(path.join(root, "morgan.log"), { flags: 'a' });
    app.use(logger("combined", { stream: logStream }));
}
mongo.connect(process.env.DBNAME, process.env.DBPORT, process.env.DBPASSWORD);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(root, 'dist')));
app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, authorization');
    res.setHeader('Access-Control-Allow-Credentials', "true");
    next();
});
app.use('/api', routes_1.default);
var port = process.env.PORT || '4001';
app.listen(port, function () { return console.log("API running on localhost:" + port); });
//# sourceMappingURL=app.js.map