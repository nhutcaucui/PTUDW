var express = require('express');
var router = express.Router();

var arListModel = require('../models/article.model.js');

var dt=require('../utils/datetime');
var moment=require('moment');

router.get('/', (req,res)=>{
    res.render('categories/category', {title: 'Danh sách'});
})

router.get('/:id', (req,res)=>{
    var cID = req.params.id;
    var c= arListModel.byCat(cID);
    c.then(crows =>{
        crows.forEach(row=>{
            row.date=moment(dt.unix2date(row.date)).format("DD/MM/YYYY");
        })
        res.render('categories/category', {title: 'Danh sách', arbycat: crows});
    }).catch(err => {
        console.log(err);
      });
})

router.get('/:id1/:id2', (req,res)=>{
    var cID = req.params.id2;
    var c= arListModel.bySubCat(cID);
    c.then(crows =>{
        crows.forEach(row=>{
            row.date=moment(dt.unix2date(row.date)).format("DD/MM/YYYY");
        })
        res.render('categories/category', {title: 'Danh sách', arbycat: crows});
    }).catch(err => {
        console.log(err);
      });
})
module.exports = router;