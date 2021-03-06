var express = require('express');
var router = express.Router();
var userModel = require('../models/user.model');
var autoMail = require('../utils/auto_mail');
var datetime = require('../utils/datetime');
var password = require('../utils/password');
var bcrypt = require('bcryptjs');
var passport = require('passport');
var userdb = require('../models/user');
var homedb = require('../models/home.model');
var url = require('url'); 
var global = require('../global');
const host = "localhost:8081";
var dbbase=require('../models/dbbase')
var auth = require('../mdw/auth');

router.get('/login', (req,res)=> {
	if(res.locals.isAuthed){
		res.render('403',{layout:false})
	}
	else{
	let params = {
		title: 'Đăng nhập',
		layout: false,
	}
	res.render('login', {title: 'Đăng nhập', error:'', layout: false});
}
});

router.get('/register', (req,res)=>{
	if(res.locals.isAuthed){
		res.render('403',{layout:false})
	}
	else{
	res.render('register', {title: 'Đăng kí', error: '', layout: false});
	}
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
	
	let verifyLink = host + '/cmpv?username=' + username + '&email=' + email + '&op=' + old_pass + '&np=' + new_pass;
	console.log('[Reset password] -', username, email. new_pass);
	autoMail.sendMail(email, 'Đặt lại mật khẩu', verifyLink);
});

router.post('/change_password', (req, res) => {
	let username = req.body.username;
	let email = req.body.email;
	let oldPass = req.body.old_password;
	let newPass = req.body.new_password;
	let otp = req.body.otp;
	let userIndex = global.getResetIndex(username);
	console.log(userIndex);
	console.log('[Change password] -', username, email, oldPass, newPass, otp);
	console.log(global.reset_password_users[userIndex]);
	if (global.reset_password_users[userIndex].otp === otp){
		console.log('[Change password] -', 'Thay đổi mật khẩu thành công');
		res.redirect('/profile?username=' + username);
	}
	else{
		console.log('[Change password] -', 'Thay đổi mật khẩu thất bại');
		res.redirect('back');
	}
	
});

router.get('/cmpv', (req, res) => {
	let username = req.query.username;
	let email = req.query.email;
	let old_pass = req.query.op;
	let new_pass = req.query.np;

	console.log('[cmpv] -', username, email, old_pass, new_pass);

	userdb.accountChangePassword(username, email, old_pass, new_pass).then(result => {
		console.log(result.message);
	});
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

	res.render('reset_password', params);
});

router.post('/user_verify', (req, res) => {
	let username = req.body.username;
	let email = req.body.email;

	console.log("[User verify] -", username, email);
	userdb.userVerify(username, email).then(result => {
		if (result.status.toLowerCase().localeCompare("success") === 0){
			console.log("[User verify] -", result.message);

			let otp = password.generateOTP();
			let reset_user = {
				username : username,
				otp : otp,
			};

			global.reset_password_users.push(reset_user);

			setTimeout(() => {
				let index = global.getResetIndex(username);
				global.reset_password_users.splice(index, 1);
			}, 300000);

			let mailContent = "Your OTP: " + otp;
			autoMail.sendMail(email, 'Thay đổi mật khẩu', mailContent);

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
		else{
			console.log("[User verify] -", result.message);
			let params = {
				title: 'Xác nhận người dùng',
				phase: 'verify',
				error: result.message,
				user: '',
				mail: '',
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

	console.log("[Verify] -", username, email, token);
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
	let flname = req.body.firstname + " " + req.body.lastname;
	let birthday = datetime.date2unix(req.body.birthday);
	let email = req.body.email;
	console.log("[Register] -", username, password, flname, birthday, email);
	userdb.accountRegister(username, password, flname, '', birthday, email).then(result => {
		//console.log(result);
		if (result.status.toLowerCase().localeCompare('failed') === 0){
			res.render('register', {title: 'Đăng kí', error: result.message, layout: false});
		}
		else{
			console.log('register',result);
			let verifyLink = 'http://' + host + "/verify?username=" + result.username + "&email=" + email + "&token=" + result.token;
			autoMail.sendMail(email, "Kích hoạt tài khoản", verifyLink);
		}
	});

});

router.get('/logins', (req, res) => {
	let username = req.query.username;
	let password = req.query.password;
	req.session.username= username;
	console.log("[Login] -", username, password);
	userdb.accountLogin(username, password).then(result => {
		if (result.status.toLowerCase().localeCompare("success") === 0){
			req.app.locals.username=username;
			res.locals.username=username;
			console.log(res.locals.username);
			console.log(req.app.locals.username);
			console.log(res.locals.username);
			console.log(result.message);

			let user = {
				username: result.username,
				flname: result.flname,
				alias: result.alias,
				level: result.level,
				premium_expired: result.premium_expired,
				birthday: result.birthday,
				token: result.token,
				email: result.email,
				id: result.id,
			}

			global.users.push(user);

			if (!global.hot)
			{
				res.redirect('/');
				return;
			}
			
			let params = {
				title: 'Trang chủ',
				hot: global.hot,
				top: global.top,
				news: global.news,
				cats: global.cats,
				layout: true,
			}			

			res.render('home', params);
		}
		else{
			let params = {
				title: 'Đăng nhập',
				error: result.message,
				layout: false,
			}
			
			res.render('login', params);
			console.log(result.message, params);
		}
	});
});

router.get('/logout', (req, res) => {
	let username = req.query.username;
	req.session.destroy();
	userdb.accountLogout(username).then(result => {
		console.log(result.message);

		global.removeUser(username);

		if (!global.hot){
			res.redirect('/');
			return;
		}

		let params = {
			title: 'Trang chủ',
			hot: global.hot,
			top: global.top,
			news: global.news,
			cats: global.cats,
			username: '',
		}

		for(const c in res.locals.userLocal){
			c.isAuthenticated=true;
		  }

		res.render('home', params);
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

router.post('/login', (req, res, next) =>{
	passport.authenticate('local', (err, user, info) => {
		if (err)
		  return next(err);
	
		if (!user) {
		  return res.render("login", { title: 'Đăng nhập',
			layout: false, error:'Tài khoản hoặc mật khẩu không đúng',
		  })
		}
		
		var s=userModel.singleByUserName(req.body.username);
		s.then(rows=>{
			rows.forEach(row=>{
				let user = {
					username: row.username,
					flname: row.flname,
					alias: row.alias,
					level: row.level,
					premium_expired: row.premium_expired,
					birthday: row.birthday,
					token: row.token,
					email: row.email,
					id: row.id,
				}
	
				global.users.push(user);
			})
			
		}).catch(err=>{
			console.log(err);
		});

		let entity = {
			is_login: 1,
			username: req.body.username
		}
		dbbase.updatetb('account', 'is_login', 'username', entity);

		req.logIn(user, err => {
		  if (err)
			return next(err);
	
		  return res.redirect('/');
		});
})(req, res, next);
})

router.post('/logout', auth, (req, res, next)=>{
	global.removeUser(res.locals.localuserName.username);
	let entity = {
		is_login: 0,
		username: res.locals.localuserName.username
	}
	dbbase.updatetb('account', 'is_login', 'username', entity);
	req.logOut();
	res.redirect("/login");
})

module.exports = router;