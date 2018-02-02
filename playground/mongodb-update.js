//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb') // same as above using object desestructuring
const dbName = 'TodoApp';

MongoClient.connect('mongodb://localhost:27017/' + dbName, (err, client) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');
  const db = client.db(dbName);

    //findOneAndUpdate
  // db.collection('Todos').findOneAndUpdate({
  //     _id: new ObjectID('5a7349f5cc4b3685ffa51634')
  //   }, {
  //     $set: {completed: true}
  //   }, {
  //     returnOriginal: false
  //   }
  // ).then((result) => {
  //     console.log(result);
  //   }, (err) => {
  //     console.log('Erro: ', err);
  //   });

    //Users
    db.collection('Users').findOneAndUpdate({
        name: 'Sara'
      }, {
        $set: {name: 'Eva'},
        $inc: { age: +1}
      }, {
        returnOriginal: false
      }
    ).then((result) => {
        console.log(result);
      }, (err) => {
        console.log('Erro: ', err);
      });

  // client.close();
});
