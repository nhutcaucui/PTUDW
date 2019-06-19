var express = require('express');
var router = express.Router();

var draftModel=require('../../models/draft.model');
var manage=require('../../models/editor');

var global=require('../../global');

router.get('/drafts', (req,res)=>{
    var asign=draftModel.getAsign(res.locals.localuserName.username);
    console.log(res.locals.localuserName.username);
    asign.then(rows=>{
        rows.forEach(row=>{
    var a=draftModel.all(row.asign);

    a.then(row=>{
        res.render('editor/draft', {title: 'Chờ duyệt', pending: row, username:''});
    }
    ).catch(err => {
        console.log(err);
      }); 
    })
    }).catch(err => {
        console.log(err);
      });     
})

router.get('/drafts/:id', (req,res)=>{
    var p=draftModel.preview(req.params.id);

    p.then(function(row) {
        res.render('editor/preview-article', {title:'Xem trước bài viết', article: row, username:''})
    }).catch(err => {
        console.log(err);
      });   
})

router.post('/drafts/:id', (req,res)=>{
    var id=req.params.id;
    
    if(req.body.confirm == "accept"){
        let header=req.body.header;
        let content=req.body.content;
        let abstract=req.body.abstract;
        let image=req.body.image;
        let cat=req.body.cat;
        let subcat=req.body.subcat;
        let tag=req.body.tag;
        let writerId= req.body.writerid
        let premium;
    
    if(req.body.premium=="premium"){
      premium=1;
    }else{
      premium=0;
    }

        manage.passAndPublic(header,content,abstract,image,cat,subcat,writerId,tag,premium,id);
    } 
    else{
        manage.deny(id);
    }
    res.redirect('/editor/drafts');
})

module.exports = router;