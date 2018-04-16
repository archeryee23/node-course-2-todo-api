const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

var id = '5ad3882ed7b7ad2b2cd8135a';

// var id = '5ad3d4775859dd335061086411';
// ObjectId("5ad3d4775859dd3350610865")
//
// if (!ObjectID.isValid(id)) {
//   console.log('ID is not valid');
// }

Todo.find({
  _id: id
}).then((todos) => {
  console.log('Todos', todos);
});

Todo.findOne({
  _id: id
}).then((todo) => {
  console.log('Todo', todo);
});

// Todo.findById(id).then((todo) => {
//   if (!todo) {
//     return console.log('Id not found');
//   }
//   console.log('Todo By Id', todo);
// }).catch((e) => console.log(e));

User.findById(id).then((user) => {
  if (!user) {
    return console.log('Id not found');
  }
  console.log(JSON.stringify(user,undefined,2));
}).catch((e) => console.log(e));
