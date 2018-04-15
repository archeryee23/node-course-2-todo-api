// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');
  const db = client.db('TodoApp');

  //deleteMany
  db.collection('Users').deleteMany({name: 'Max Archer Yee'}).then((result) => {
    console.log(result);
  });
  //deleteOne
  // db.collection('Todos').deleteOne({text: 'Eat Lunch'}).then((result) => {
  //   console.log(result);
  // });
  //findOneAndDelete
  db.collection('Users').findOneAndDelete({
    _id: new ObjectID('5ad2a25c8efd8b27b053cf3c')
  }).then((result) => {
    console.log(result);
  });

  // db.collection('Users').find({name: 'Keith'}).toArray().then((docs) => {
  //   console.log(JSON.stringify(docs, undefined, 2));
  // }, (err) => {
  //   console.log('Unable to fetch todos', err);
  // });

  client.close();
});
