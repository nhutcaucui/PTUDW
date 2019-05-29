var express = require('express');
var router = express.Router();

router.get('/new', (req,res)=>{
    res.render('writer/new-article', {title: 'Bai viet moi'});
})

module.exports = router;