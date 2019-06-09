var express = require('express');
var router = express.Router();

var arListModel = require('../models/article.model.js');

router.get('/', (req,res)=>{
    res.render('categories/category', {title: 'Danh sách'});
})

router.get('/:id', (req,res)=>{
    var cID = req.params.id;
    var c= arListModel.byCat(cID);
    c.then(crows =>{
        res.render('categories/category', {title: 'Danh sách', arbycat: crows});
    }).catch(err => {
        console.log(err);
      });
})

router.get('/:id1/:id2', (req,res)=>{
    var cID = req.params.id2;
    var c= arListModel.bySubCat(cID);
    c.then(crows =>{
        res.render('categories/category', {title: 'Danh sách', arbycat: crows});
    }).catch(err => {
        console.log(err);
      });
})
module.exports = router;