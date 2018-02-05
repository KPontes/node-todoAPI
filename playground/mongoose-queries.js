const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');

var id = '5a74c07e21886554642ccdf8';

if (!ObjectID.isValid(id)) {
  console.log('Id not valid');
};

// Todo.find({
//   _id: id
// }).then((todos) => {
//   console.log('Todos', todos);
// }).catch((e) => console.log(e));
//
// Todo.findOne({
//   _id: id
// }).then((todo) => {
//   console.log('Todo', todo);
// }).catch((e) => console.log(e));

Todo.findById(id).then((todo) => {
  if (!todo) {
    return console.log('Id not found');
  }
  console.log('Todo by id', todo);
}).catch((e) => console.log(e));
