var express = require('express');
var router = express.Router();

var articleModel= require('../models/article.model.js');

router.get('/:id', (req,res)=>{
    var arId = req.params.id;
    var a=articleModel.all(arId);
    var c=articleModel.comment(arId);
    var r=articleModel.relevant(arId);
    var bc=articleModel.breadCat(arId);
    var bs=articleModel.breadSubCat(arId);

    a.then(arows =>{
        r.then(rrows =>{
            c.then(crows=>{
                bc.then(cID=>{
                    bs.then(sID=>{
                        res.render('articles/article', {title: 'Bài viết', article: arows, relevant: rrows, comment: crows, breadc: cID, breads: sID});
                    }
                    ).catch(err => {
                        console.log(err);
                      });
                }).catch(err => {
                    console.log(err);
                  });
            }).catch(err => {
                console.log(err);
              });
        }).catch(err => {
            console.log(err);
          });
    }).catch(err => {
        console.log(err);
      });
   
})

module.exports = router;