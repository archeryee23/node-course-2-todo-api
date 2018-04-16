var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

const {ObjectID} = require('mongodb');

var app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  console.log(req.body);
  var todo = new Todo({
    text: req.body.text,
    completed: req.body.completed
  });

  todo.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});

//GET /todos
app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({todos});
    }, (e) => {
      res.status(400).send(e);
    });
});

//GET /todos/123
app.get('/todos/:id', (req,res) => {
  var id = req.params.id;
  if (!ObjectID.isValid(id)) {
    res.status(404).send({});
  }

  Todo.findById(id).then((todo) => {
    if (!todo) {
      return res.status(404).send({});
    }

    res.status(200).send({todo});
  }).catch((e) => res.status(400).send(e));
});

app.listen(3000, () => {
  console.log('Started on port 3000');
})

// var newTodo = new Todo({
//   text: '   Go for walk in Dog Park   '
// });
//
// newTodo.save().then((doc) => {
//   console.log('Saved todo', doc);
// }, (e) => {
//   console.log('Unable to save todo')
// });



// var user = new User({
//   email: '   archeryee23@gmail.com   '
// });
//
// user.save().then((user) => {
//   console.log('Saved user', user);
// }, (e) => {
//   console.log('Unable to save user', e);
// });

module.exports = {app};
