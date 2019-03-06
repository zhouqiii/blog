var MongoClient = require('mongodb').MongoClient,
    assert = require('assert');

// connection url
var url = 'mongodb://localhost:27017/blog';

//use connect method to connect to the server
MongoClient.connect(url,function(err,db){
    assert.equal(null,err);
    console.log("connected successfully to server");

    db.close();
});