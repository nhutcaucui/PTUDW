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
            
            if (result.premium){
                result.premium = datetime.format(datetime.unix2date(result.premium), "DD/MM/YYYY");
            }
            else{
                result.premium = "Chưa nâng cấp premium";
            }

            if (result.premium == null){
                result.premium = "Chưa nâng cấp premium";
            }

            result.birthday = datetime.format(datetime.unix2date(result.birthday), "DD/MM/YYYY");

            let params = {
                title : 'Thông tin',
                role: role,
                username: username,
                name: result.name,
                birthday: result.birthday,
                email: result.email,
                alias: result.alias,
                premium_expired: result.premium,
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

router.post('/update_name', (req, res) => {
    console.log('[Update Name] -', req.body);
    let username = req.body.username;
    let firstname = req.body.firstname.trim();
    let lastname = req.body.lastname.trim();
    let flname = firstname + " " + lastname;

    profiledb.nameUpdate(username, flname).then(result => {
        console.log(result);
        res.redirect('/profile?username=' + username);
    });
});

router.post('/update_birthday', (req, res) => {
    console.log('[Update Birthday] -');
    let username = req.body.username;
    let birthday = datetime.date2unix(req.body.birthday);
    profiledb.birthUpdate(username, birthday).then(result => {
        console.log(result);

        res.redirect('/profile?username=' + username);
    });
});

router.post('/update_premium', (req, res) => {
    let username = req.body.username;
    let date = req.body.date;
    let packages = req.body.packages;

    console.log('[Update Premium] -', username, date, packages);

    if (!datetime.isValid(date, "DD/MM/YYYY")){
        date = new Date();

    }

    date = datetime.date2unix(date);

    profiledb.accountPremium(username, date).then(result => {
        console.log('[Update Premium] -', result.message);

        if (result.status.toLowerCase().localeCompare("success") === 0){
            res.redirect('/profile?username=' + username);
        }
        else{

        }
    });
});

router.post('/update_alias', (req, res) => {
    console.log('[Update Alias] -');
    let username = req.body.username;
    let alias = req.body.alias.trim();

    profiledb.aliasUpdate(username, alias).then(result => {
        console.log(result);
        res.redirect('/profile?username=' + username);
    });

});

module.exports = router;