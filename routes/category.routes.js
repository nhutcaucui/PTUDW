var express = require('express');
var router = express.Router();

router.get('/', (req,res)=>{
    res.render('categories/category', {title: 'Danh sach'});
})

module.exports = router;