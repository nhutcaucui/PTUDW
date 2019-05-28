var express = require('express');
var router = express.Router();

router.get('/', (req,res)=>{
    res.render('login', {title: 'Dang nhap', layout: false});
})

module.exports = router;