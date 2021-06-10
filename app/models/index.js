const mongoose = require('mongoose');
//const textSearch = require('mongoose-text-search');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.role = require("./role.model");
db.project = require("./project.model");
db.profile= require("./profile.model")
db.ROLES = ["user", "admin"];

module.exports = db;
