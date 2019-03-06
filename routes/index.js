var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var User = require('../models/user');

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
  // register
  var name = req.body.name,
    password = req.body.password,
    email = req.body.email;
  var md5 = crypto.createHash('md5');
  var password = md5.update(req.body.password).digest('hex');
  var newUser = new User({
    name: req.body.name,
    password: password,
    email: req.body.email
  });
  //检查用户名是否已存在
  //todo
  
  //新建用户
  newUser.save(function (err,user){
    if(err){
      return res.redirect('/reg');
    }
    req.session.user = user;
    redirect('/');
  });
  res.render('reg',{title : 'register'});
});

module.exports = router;