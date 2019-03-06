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
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  db.close();
});


module.exports = User;
//存
User.prototype.save = function(callback){
    //data 
    var user = {
        name:this.name,
        password:this.password,
        email:this.email
    };
    // onpen db
    MongoClient.connect(url,function(err,db){
        asert.equal(null,err);
        console.error(err);
        db.collection('users',function(err,collection){
            collection.insertOne(user,function(err,result){
                db.close();
                callback(result);
            })
        })
        console.log('connecting seccessfuly to blog');
        db.close;
    })
}
//取
var kuser = new User({
    name:'admin',
    password:'admin',
    email:'123@hcen.xyz'
});
console.log('111');
kuser.save;
console.log('111');
var insertDocuments = function(db, callback) {
    // Get the documents collection
    var collection = db.collection('documents');
    // Insert some documents
    collection.insertMany([
      {a : 1}, {a : 2}, {a : 3}
    ], function(err, result) {
      assert.equal(err, null);
      assert.equal(3, result.result.n);
      assert.equal(3, result.ops.length);
      console.log("Inserted 3 documents into the collection");
      callback(result);
    });
  }
var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

// Connection URL
var url = 'mongodb://localhost:27017/blog';
// Use connect method to connect to the server
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  insertDocuments(db, function() {
    db.close();
  });
});

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
  var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

// Connection URL
var url = 'mongodb://localhost:27017/blog';
// Use connect method to connect to the server
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected correctly to server");

  insertDocuments(db, function() {
    findDocuments(db, function() {
      db.close();
    });
  });
});
