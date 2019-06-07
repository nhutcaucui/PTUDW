var express = require('express');
var router = express.Router();

router.get('/', (req,res)=>{
    res.render('categories/category', {title: 'Danh sach'});
})

router.get('/:id1', (req,res)=>{
    res.render('categories/category', {title: 'Danh sach'});
})

router.get('/:id1/:id2', (req,res)=>{
    res.render('categories/category', {title: 'Danh sach'});
})
module.exports = router;