var express = require('express');
var router = express.Router();

router.get('/drafts', (req,res)=>{
    res.render('editor/draft', {title: 'Cho duyet'});
})

module.exports = router;