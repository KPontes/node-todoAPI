const MongoClient = require('mongodb').MongoClient;
const dbName = 'TodoApp';

var obj = new ObjectID();
console.log(obj); // composed by timestamp + machine id + process id + random

MongoClient.connect('mongodb://localhost:27017/' + dbName, (err, client) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');
  const db = client.db(dbName);
  // db.collection('Todos').insertOne({
  //   text: 'Something to do',
  //   completed: false
  // }, (err, result) => {
  //   if (err) {
  //     return console.log('Unable to insert todo', err);
  //   }
  //
  //   console.log(JSON.stringify(result.ops, undefined, 2));
  // });
  db.collection('Users').insertOne({
    name: 'Krishnan Pontes',
    age: 40,
    location: 'Rio de Janeiro'
  }, (err, result) => {
    if (err) {
      return console.log('Unable to insert to Users', err);
    }

    console.log(JSON.stringify(result.ops, undefined, 2));
    console.log(result.ops[0]._id.getTimestamp());
  });

  client.close();
});
