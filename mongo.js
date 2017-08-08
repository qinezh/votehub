"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
exports.mongoose = mongoose;
mongoose.Promise = global.Promise;
function connect(dbName, dbPort, dbPassword) {
    if (!dbName || !dbPort || !dbPassword) {
        throw new Error("Can't get Database connection information.");
    }
    var mongoUri = "mongodb://" + dbName + ":" + dbPassword + "@" + dbName + ".documents.azure.com:" + dbPort + "/?ssl=true"; //&replicaSet=globaldb
    return mongoose.connect(mongoUri, { useMongoClient: true }, function (err) {
        if (err) {
            console.log("Can't connect to mongodb: " + err.message);
        }
    });
}
exports.connect = connect;
