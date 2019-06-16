var express = require('express');
var router = express.Router();
var profiledb = require('../models/profile');
var datetime = require('../utils/datetime');

router.get('/', (req, res) => {
    let username = req.query.username;
    console.log('[Profile] -', username);
    
    profiledb.getProfile(username).then(result => {
        console.log(result);
        if (result.status.toLowerCase().localeCompare('success') === 0){
            let role = '';
            switch (result.level){
                case 1:
                    role = 'user';
                    break;
                case 2:
                    role = 'writer';
                    break;
                case 3:
                    role = 'editor';
                    break;
                case 4:
                    role = 'admin';
                    break;
            }

            if (result.premium_expired){
                result.premium_expired = datetime.format(datetime.unix2date(result.premium_expired), "DD/MM/YYYY");
            }
            else{
                premium_expired = "Không có";
            }
            let birthday = datetime.format(datetime.unix2date(result.birthday), "DD/MM/YYYY");

            let params = {
                title : 'Thông tin',
                role: role,
                username: username,
                name: result.name,
                birthday: result.birthday,
                email: result.email,
                alias: result.alias,
                premium_expired: result.premium_expired,
                layout : true
            }

            res.render('account/user-profile', params);
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