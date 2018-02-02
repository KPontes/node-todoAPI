//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb') // same as above using object desestructuring
const dbName = 'TodoApp';

MongoClient.connect('mongodb://localhost:27017/' + dbName, (err, client) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');
  const db = client.db(dbName);
  // .find ({_id: new ObjectID('5a731cffcc4b3685ffa5135a')}) //if want to query by the _Id
  // ** returns a promise
  // db.collection('Todos').find({completed: false}).toArray().then((docs) => {
  //   console.log('Todos');
  //   console.log(JSON.stringify(docs, undefined, 2));
  // }, (err) => {
  //   console.log('Unable to fetch Todos', err);
  // });

  // db.collection('Todos').find({completed: false}).count().then((count) => {
  //   console.log('Todos count: ' + count);
  // }, (err) => {
  //   console.log('Unable to count', err);
  // });

  db.collection('Users').find({name: 'Paulinha'}).toArray().then((docs) => {
    console.log('Users');
    console.log(JSON.stringify(docs, undefined, 2));
  }, (err) => {
    console.log('Unable to fetch Users', err);
  });

  // client.close();
});
