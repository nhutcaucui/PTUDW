var express = require('express');
var router = express.Router();
var userModel = require('../models/user.model');
var autoMail = require('../utils/auto_mail');
var bcrypt = require('bcryptjs');
var userdb = require('../models/user');

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

router.get('/verify', (req, res) => {
	console.log('yes');
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