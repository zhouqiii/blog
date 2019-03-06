//var mongodb = require('./db');
var MongoClient = require('mongodb').MongoClient,
    asert = require('assert');

var url = 'mongodb://localhost:27017/blog';

function User (user){
    this.name =user.name;
    this.password = user.password;
    this.email = user.email;
};


// Use connect method to connect to the server
// MongoClient.connect(url, function(err, db) {
//   assert.equal(null, err);
//   console.log("Connected successfully to server");

//   db.close();
// });



//存

//取

var insertDocuments = function(db, callback) {
    var user = {
      name: this.name,
      password: this.password,
      email: this.email
    };
    // Get the documents collection
    var collection = db.collection('users');
    // Insert some documents
    collection.insertOne(user, function(err, result) {
      callback(result);
    });
  }
User.prototype.save = function(callback){
  MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    console.log("Connected successfully to server");
  
    insertDocuments(db, function() {
      db.close();
    });
  });
}
// Use connect method to connect to the server


var findDocuments = function(db, callback) {
    // Get the documents collection
    var collection = db.collection('documents');
    // Find some documents
    collection.find({}).toArray(function(err, docs) {
      assert.equal(err, null);
      console.log("Found the following records");
      console.log(docs)
      callback(docs);
    });
  }

// Use connect method to connect to the server
// MongoClient.connect(url, function(err, db) {
//   assert.equal(null, err);
//   console.log("Connected correctly to server");

//   insertDocuments(db, function() {
//     findDocuments(db, function() {
//       db.close();
//     });
//   });
// });

module.exports = User;