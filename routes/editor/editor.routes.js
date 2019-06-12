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

module.exports = router;