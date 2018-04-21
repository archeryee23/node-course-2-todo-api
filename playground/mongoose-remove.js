const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// Todo.remove({}).then((result) => {
//   console.log(result);
// });


Todo.findOneAndRemove({_id: ''}).then((todo) => {

});

Todo.findByIdAndRemove('5adb5c263a3531316095bd99').then((todo) => {
  console.log(todo);
});
