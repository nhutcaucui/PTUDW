var express = require('express');
var router = express.Router();
var userModel = require('../models/user.model');
var autoMail = require('../utils/auto_mail');
var bcrypt = require('bcryptjs');
var userdb = require('../models/user');
var url = require('url');  

router.get('/login', (req,res)=>{
    res.render('login', {title: 'Đăng nhập', error:'', layout: false});
});

router.get('/register', (req,res)=>{
    res.render('register', {title: 'Đăng kí', error: '', layout: false});
});

router.post('/verify', (req,res) => {
	let username = req.query.username;
	let email = req.query.email;
	let token = req.query.token;

	console.log("verify: ", username, email, token);
	userdb.accountVerify(username, email, token);
});

router.post('/reset_password', (req, res) => {
	console.log('post reset password');
	let username = req.body.username;
	let email = req.body.email;
	let old_pass = req.body.old_password;
	let new_pass = req.body.new_password;
	
	let verifyLink = 'localhost:8081/cmpv?username=' + username + '&email=' + email + '&op=' + old_pass + '&np=' + new_pass;
	console.log(verifyLink);
	autoMail.sendMail(email, 'Đặt lại mật khẩu', verifyLink);
});

router.post('/change_password', (req, res) => {
	let username = req.body.username;
	let email = req.body.email;
	let oldPass = req.body.old_password;
	let newPass = req.body.new_password;
	let verifyLink = 'localhost:8081/cmpv?username=' + username + '&email=' + email + '&op=' + oldPass + '&np=' + newPass;

	console.log('Change password: ', username, email, oldPass, newPass);
	console.log(verifyLink);
	autoMail.sendMail(email, 'Thay đổi mật khẩu', verifyLink);
});

router.get('/cmpv', (req, res) => {
	let username = req.query.username;
	let email = req.query.email;
	let old_pass = req.query.op;
	let new_pass = req.query.np;

	console.log('cmpv', username, email, old_pass, new_pass);

	userdb.accountChangePassword(username, email, old_pass, new_pass);
});


router.get('/user_verify', (req, res) => {
	let params = {
		title: 'Xác nhận người dùng',
		phase: 'verify',
		error: '',
		user: '',
		mail: '',
		layout: false,
	};

	console.log('hi');
	res.render('reset_password', params);
});

router.post('/user_verify', (req, res) => {
	let username = req.body.username;
	let email = req.body.email;

	console.log("reset pass: ", username, email);
	userdb.userVerify(username, email).then(result => {
		if (result.status.toLowerCase().localeCompare("success") === 0){
			let params = {
				title: 'Đổi mật khẩu',
				phase: 'change_password',
				error: '',
				user: username,
				mail: email,
				layout: false,
			};
			res.render('reset_password', params);
		}
	});
});

router.get('/verify', (req, res) => {
	let username = req.query.username;
	let email = req.query.email;
	let token = req.query.token;

	console.log("verify: ", username, email, token);
	userdb.accountVerify(username, email, token).then(result => {
		console.log(result);

		if (result.status.toLowerCase().localeCompare("success") === 0){
			res.render('login', {title: 'Đăng nhập', error: '', layout: false});
		}
		else{
			res.render('login', {title: 'Đăng nhập', error: result.message, layout: false});
		}
	});
})

router.post('/register', (req,res)=>{
	let username = req.body.username;
	let password = req.body.password;
	let email = req.body.email;
	console.log(username, password);
	userdb.accountRegister(username, password, email, -1).then(result => {
		//console.log(result);
		if (result.status.toLowerCase().localeCompare('failed') === 0){
			res.render('register', {title: 'Đăng kí', error: result.message, layout: false});
		}
		else{
			console.log(result);
			let verifyLink = "localhost:8081/verify?username=" + result.username + "&email=" + result.email + "&token=" + result.token;
			autoMail.sendMail(result.email, "meo meo cute", verifyLink);
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