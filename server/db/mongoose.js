var mongoose = require('mongoose');
// mongodb://user:pws@url:port/dbname
const REMOTE_MONGO = 'mongodb://dev:1234@ds125628.mlab.com:25628/ponteskl-todoapi';
const LOCAL_MONGO = process.env.MONGODB_URI; //was set through config.json
//if exists process.env.PORT means we are in production
const MONGO_URI = (process.env.PORT == 3000) ? LOCAL_MONGO : REMOTE_MONGO;

mongoose.Promise = global.Promise;

mongoose.connect(MONGO_URI);

module.exports = {mongoose};
