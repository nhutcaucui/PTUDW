var express = require('express');
var router = express.Router();

router.get('/manage', (req,res)=>{
    res.render('admin/manage', {title: 'Quan li trang'});
})

module.exports = router;