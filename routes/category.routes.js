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
    var limit=3;
    var page = req.query.page || 1;
    if (page < 1) page = 1;
    var offset = (page - 1) * limit;

    Promise.all([
        arListModel.countByCat(cID),
        arListModel.byCat(cID, limit, offset)
      ]).then(([count_rows, rows]) => {
    
        for (const c of res.locals.lcCategories) {
          if (c.ID === +cID) {
            c.isActive = true;
          }
        }

        var pages = [];
        var total = count_rows[0].total;
        var nPages = Math.floor(total / limit);
        if (total % limit > 0) nPages++;
    for (i = 1; i <= nPages; i++) {
      var active = false;
      if (+page === i) active = true;

      var obj = {
        value: i,
        active
      }
      pages.push(obj);
    }
    rows.forEach(row=>{
        row.date=moment(dt.unix2date(row.date)).format("DD/MM/YYYY");
    })
    res.render('categories/category', {title: 'Danh sách', arbycat: rows, pages});     
        
    }).catch(err => {
        console.log(err);
      });
})

router.get('/:id1/:id2', (req,res)=>{
    var scID = req.params.id2;
    var cID = req.param.id1;
    var limit=3;
    var page = req.query.page || 1;
    if (page < 1) page = 1;
    var offset = (page - 1) * limit;

    Promise.all([
        arListModel.countBySubCat(scID),
        arListModel.bySubCat(scID, limit, offset)
      ]).then(([count_rows, rows]) => {
    
        for (const c of res.locals.lcCategories) {
          if (c.ID === +cID) {
            c.isActive = true;
          }
        }

        var pages = [];
        var total = count_rows[0].total;
        var nPages = Math.floor(total / limit);
        if (total % limit > 0) nPages++;
    for (i = 1; i <= nPages; i++) {
      var active = false;
      if (+page === i) active = true;

      var obj = {
        value: i,
        active
      }
      pages.push(obj);
    }

    rows.forEach(row=>{
        row.date=moment(dt.unix2date(row.date)).format("DD/MM/YYYY");
    })
    res.render('categories/category', {title: 'Danh sách', arbycat: rows, pages});     
        
    }).catch(err => {
        console.log(err);
      });
})
module.exports = router;