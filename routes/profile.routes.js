var express = require('express');
var router = express.Router();
var profiledb = require('../models/profile');

router.get('/', (req, res) => {
    let username = req.query.username;
    console.log('[Profile] -', username);
    
    profiledb.getProfile(username).then(result => {
        console.log(result);
        if (result.status.toLowerCase().localeCompare('success') === 0){

        }
        else{
            let params = {
                title : 'Đăng nhập',
                error: result.message,
                layout: false,
            }
            res.render('login', params);
        }
    });
});

module.exports = router;