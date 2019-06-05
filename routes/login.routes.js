var express = require('express');
var router = express.Router();

router.get('/login', (req,res)=>{
    res.render('login', {title: 'Đăng kí', layout: false});
})

router.get('/register', (req,res)=>{
    res.render('register', {title: 'Đăng kí', layout: false});
})

module.exports = router;