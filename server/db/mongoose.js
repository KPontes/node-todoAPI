var mongoose = require('mongoose');

const REMOTE_MONGO = 'mongodb://ponteskl:dev12345@ds125628.mlab.com:25628/ponteskl-todoapi';
const LOCAL_MONGO = 'mongodb://localhost:27017/TodoMgs';
const MONGO_URI = process.env.PORT ? REMOTE_MONGO : LOCAL_MONGO;

mongoose.Promise = global.Promise;

mongoose.connect(MONGO_URI);

module.exports = {mongoose};
