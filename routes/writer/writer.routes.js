var express = require('express');
var router = express.Router();

var writerModel=require('../../models/writer.model');

router.get('/new', (req,res)=>{
    res.render('writer/new-article', {title: 'Bài viết mới'});
})

router.get('/my-article', (req,res)=>{
    res.render('writer/my-article', {title: 'Bài viết của tôi', pending: 'not yet'});
})

module.exports = router;