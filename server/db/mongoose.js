var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
const dbName = 'TodoMgs';
mongoose.connect('mongodb://localhost:27017/' + dbName);

module.exports = {mongoose};
