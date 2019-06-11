var express = require('express');
var router = express.Router();
var userModel = require('../models/user.model');

var bcrypt= require('bcrypt');

router.get('/login', (req,res)=>{
    res.render('login', {title: 'Đăng nhập', layout: false});
})

router.get('/register', (req,res)=>{
    res.render('register', {title: 'Đăng kí', layout: false});
})

router.post('/register', (req,res)=>{
    var saltR=10;
    var hash = bcrypt.hashSync(req.body.pass, saltR);

    var entity = {
        username: req.body.username,
        password: hash,
        level: 3,
    }

    userModel.add(entity).then(id => {
        res.redirect('/login');
      })   
})

router.get('/is-available', (req, res, next) => {
    var user = req.query.username;
    userModel.singleByUserName(user).then(rows => {
      if (rows.length > 0)
        return res.json(false);
  
      return res.json(true);
    });
  })

module.exports = router;