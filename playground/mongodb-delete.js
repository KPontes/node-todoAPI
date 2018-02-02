//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb') // same as above using object desestructuring
const dbName = 'TodoApp';

MongoClient.connect('mongodb://localhost:27017/' + dbName, (err, client) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');
  const db = client.db(dbName);
  //deleteMany
  // db.collection('Todos').deleteMany({text: 'eat lunch'}).then((result) => {
  //   console.log(result);
  // }, (err) => {
  //   console.log('Erro: ', err);
  // });

  //deleteOne
  // db.collection('Todos').deleteOne({text: 'eat lunch'}).then((result) => {
  //   console.log(result);
  // }, (err) => {
  //   console.log('Erro: ', err);
  // });

  //findOneAndDelete
  // db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
  //   console.log(result);
  // }, (err) => {
  //   console.log('Erro: ', err);
  // });

  // delete Users from object Id
  db.collection('Users').findOneAndDelete({_id: new ObjectID('5a735267cc4b3685ffa51863')}).then((result) => {
    console.log(JSON.stringify(result, undefined, 2));
  }, (err) => {
    console.log('Erro: ', err);
  });
  // client.close();
});
