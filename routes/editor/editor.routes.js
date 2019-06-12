var express = require('express');
var router = express.Router();

var draftModel=require('../../models/draft.model');

router.get('/drafts', (req,res)=>{
    var a=draftModel.all();

    a.then(row=>{
        res.render('editor/draft', {title: 'Chờ duyệt', pending: row});
    }
    ).catch(err => {
        console.log(err);
      });   
})

router.get('/drafts/:id', (req,res)=>{
    var p=draftModel.preview(req.params.id);

    p.then(function(row) {
        res.render('editor/preview-article', {title:'Xem trước bài viết', article: row})
    }).catch(err => {
        console.log(err);
      });   
})

module.exports = router;