const config = require('./config/config');
const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

const {ObjectID} = require('mongodb');

var app = express();
const port = process.env.PORT;

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
    console.log('ObjectID is invalid');
    return res.status(404).send({});
  }

  Todo.findById(id).then((todo) => {
    if (!todo) {
      return res.status(404).send({});
    }

    res.status(200).send({todo});
  }).catch((e) => res.status(400).send(e));
});

app.delete('/todos/:id', (req, res) => {
  // get the id
  // validate the id -> not valid? return 404
  var id = req.params.id;
  if (!ObjectID.isValid(id)) {
    console.log('ObjectID is invalid');
    return res.status(404).send({});
  }

  //remove todo by id
  Todo.findByIdAndRemove(id).then((todo) => {
    if (!todo) {
      return res.status(404).send({});
    }
    res.status(200).send({todo});
  }).catch((e) => res.status(400).send(e));
});

app.patch('/todos/:id', (req, res) => {
  var id = req.params.id;
  var body = _.pick(req.body, ['text','completed']);
  if (!ObjectID.isValid(id)) {
    return res.status(404).send({});
  }

  if (_.isBoolean(body.completed) && body.completed) {
    console.log(`completed`);
    body.completedAt = new Date().getTime();
  } else {
    console.log(`not completed`);
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }
    res.send({todo});
  }).catch((e) => {
    res.status(400).send();
  })
});

// POST /Users
app.post('/users', (req,res) => {
  //pick off email and password
  var body = _.pick(req.body, ['email','password']);
  var user = new User(body);

  //User.findByToken
  //user.generateAuthToken

  user.save().then(() => {
    return user.generateAuthToken();
  }).then((token) => {
    res.header('x-auth', token).send(user);
  }).catch((e) => {
    res.status(400).send(e);
  })
});

app.listen(port, () => {
  console.log(`Started on port ${port}`);
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
