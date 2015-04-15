var Firebase = require("firebase");
var config = require("../../config.json");

module.exports = new Firebase(config.firebase_ref);
