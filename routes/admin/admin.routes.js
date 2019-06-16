var express = require('express');
var router = express.Router();

var adminModel = require('../../models/admin.model');

router.get('/', (req,res)=>{
    var a=adminModel.getAr();
    var c=adminModel.getCat();
    var sc=adminModel.getSubCat();
    var t=adminModel.getTag();
    var u=adminModel.getUsername();
    a.then(arows=>{
        c.then(crows=>{
            sc.then(scrows=>{
                t.then(trows=>{
                    u.then(urows=>{
                        var objects={
                            title: 'Quản lí trang',
                            article:arows,
                            cat:crows,
                            subcat:scrows,
                            tag:trows,
                            user:urows,
                        }
                        res.render('admin/manage', objects);
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
    }).catch(err => {
        console.log(err);
      });
    
})

module.exports = router;