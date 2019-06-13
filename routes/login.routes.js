var express = require('express');
var router = express.Router();
var userModel = require('../models/user.model');
var autoMail = require('../utils/auto_mail');
var bcrypt = require('bcryptjs');
var userdb = require('../models/user');

const USER = 'tangkiemthusinh@gmail.com';
const PASS = 'ufvzyqzwayeopcyg';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: USER,
      pass: PASS
    }
});

router.get('/login', (req,res)=>{
    res.render('login', {title: 'Đăng nhập', error:'', layout: false});
});

router.get('/register', (req,res)=>{
    res.render('register', {title: 'Đăng kí', layout: false});
});

router.post('/register', (req,res)=>{
    var saltR=10;
    var hash = bcrypt.hashSync(req.body.pass, saltR);

    var entity = {
        username: req.body.username,
        password: hash,
        level: 3,
	}
	
	userdb.accountRegister(req.body.username, req.body.password, 3).then(result => {
		if (result.status.toLowerCase().localeCompare('failed') === 0){
			res.render('register', {title: 'Đăng kí', error: result.message, layout: false});
		}
		else{
			autoMail.sendMail()
		}
	});

});

router.get('/logins', (req, res) => {
	console.log('hi mom');
	let username = req.query.username;
	let password = req.query.password;
	console.log(username, password);
	userdb.accountVerify(username, password).then(yes => {
		if (yes){
			console.log("yes, indeed");
		}
		else{
			res.render('login', {title: 'Đăng nhập', error: 'meo', layout: false});;
		}
	});
});

router.get('/is-available', (req, res, next) => {
    var user = req.query.username;
    userModel.singleByUserName(user).then(rows => {
      if (rows.length > 0)
        return res.json(false);
  
      return res.json(true);
    });
});



module.exports = router;