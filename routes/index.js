var express = require('express');
var router = express.Router();

/* GET home page. */


router.get('/',function(req,res){
    res.render('index', { title: 'Express'});
  });
router.get('/login',function(req,res){
    //res.send('hi');
    res.render('login', { title: 'login'});
});
router.get('/post',function(req,res){
  res.render('post',{title : 'post'});
});
router.get('/reg',function(req,res){
  res.render('reg',{title : 'register'});
});

module.exports = router;