var express = require('express');
var router = express.Router();

var articleModel= require('../models/article.model.js');
var userModel=require('../models/user.model')

var dt=require('../utils/datetime');
var moment=require('moment');

router.get('/:id', (req,res)=>{


    var arId = req.params.id;
    var a=articleModel.all(arId);
    var c=articleModel.comment(arId);
    var r=articleModel.relevant(arId);
    var bc=articleModel.breadCat(arId);
    var bs=articleModel.breadSubCat(arId);
    var name='';

    a.then(arows =>{
        arows.forEach(row => {
            if (row.premium==1){
                if(!res.locals.isAuthed){
                    res.render('403',{layout:false})
                }
                
            }            
            name= row.header;
            row.date=moment(dt.unix2date(row.date)).format("DD/MM/YYYY");
        });
        r.then(rrows =>{
            c.then(crows=>{
                bc.then(cID=>{
                    bs.then(sID=>{
                        var user=userModel.singleByUserName(res.locals.localuserName.username);
                user.then(userrows=>{
                    userrows.forEach(urow=>{
                        console.log(dt.date2unix(Date.now()));
                        console.log(urow.premium_expired);
                        if(urow.level==1 && urow.premium_expired < dt.date2unix(Date.now())){                         
                            res.render('403',{layout:false})
                        }
                        else{
                            res.render('articles/article', {title: name, article: arows, relevant: rrows, comment: crows, breadc: cID, breads: sID});
                        }
                    })
                }).catch(err=>{
                    console.log(err);
                });
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