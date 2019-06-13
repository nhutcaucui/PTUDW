var express = require('express');
var router = express.Router();

var writerModel=require('../../models/writer.model');

router.get('/new', (req,res)=>{
    var c=writerModel.getCat();
    var sc=[];
    var nid=writerModel.getNextID();
    var i=0;

    nid.then(newid=>{
        c.then(crow=>{
            var objects={title: 'Bài viết mới', cat:crow, newid:newid};
            crow.forEach(function(row){
               sc[i]=writerModel.getSubCat(row.ID);
               i++;
               var name='subcat'+i;
               sc[i].then(loop=>{
                    objects[name]= loop;
               }).catch(err => {
                console.log(err);
              });
              res.render('writer/new-article', objects);
            }            
            );       
        }).catch(err => {
            console.log(err);
          });
    }).cat(err => {
        console.log(err);
      });
        
})

router.get('/my-article', (req,res)=>{
    var a=writerModel.all();
    a.then(row=>{
        res.render('writer/my-article', {title: 'Bài viết của tôi', pending: row});
    }).catch(err => {
        console.log(err);
      });
    
})

module.exports = router;