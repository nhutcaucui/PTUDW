const bcrypt = require('bcryptjs');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const SALT_ROUNDS = 10;
const crypto = require('crypto');

var db = require('./index').mysql;
var dbbase = require('./dbbase');

function accountRegister(username, password, flname, alias, birthday, email, role){
	console.log("pass:" + password);
    return new Promise((resolve, reject) => {
        let query = "SELECT * FROM account WHERE username = ?";
        db.query(query, [username], (err, res) => {
    		if (err){
        		reject(err);
			}
			
			if (res.length > 0){
				let result = {
					status : 'failed',
					message : "Username is existed",
					token: '',
				}
				resolve(result);
			}
			else{
				console.log(password);
				generate_token().then(token => {
					bcrypt.hash(password, SALT_ROUNDS, (err, hash) => {
						let entity = {
							username: username,
							password: hash,
							is_login: 0,
							flname: flname,
							birthday: birthday,
							email: email,
							level: -1,
							token: token,
						}

						let response = {
							status: 'success',
							username: username,
							password: hash,
							email: email,
							token: token,
						}
						dbbase.addtb('account', entity);
						resolve(response);
					});
				})
				
			}
        });
    });

    bcrypt.hash(password, SALT_ROUNDS, (err, hash) =>{
        console.log(hash);
    });
}

function accountResetPassword(username, email, newPass){
	return new Promise((resolve, reject) => {
		let query = "SELECT * FROM account WHERE username=?";
		let params = [username];

		db.query(query, params, (err, res) => {
			if (err){
				throw err;
			}	

			if (res.length > 0){
				bcrypt.hash(newPass, SALT_ROUNDS).then((hash) => {
					let entity = {
						password: hash,
						username: username,
					};

					dbbase.updatetb('account', 'password', 'username', entity);

					let result= {
						status: 'success',
						message: 'Đặt lại mật khẩu thành công'
					};

					resolve(result);
				});
			}
		});
	});
}

function accountChangePassword(username, email, oldPass, newPass){
	return new Promise((resolve, reject) => {
		let query = "SELECT * FROM account WHERE username=?";
		let params = [username];
		db.query(query, params, (err, res) => {
			if (err){
				throw err;
			}

			if (res.length > 0){
				let password = res[0].password;
				bcrypt.compare(oldPass, password).then((res) => {
					if (res){
						bcrypt.hash(newPass, SALT_ROUNDS).then((hash) => {
							let entity = {
								password: hash,
								username: username,
							};
							dbbase.updatetb('account', 'password', 'username', entity);

							let result= {
								status: 'success',
								message: 'Thay đổi mật khẩu thành công'
							};

							resolve(result);
						});
					}else{
						let result = {
							status: 'failed',
							message: 'Mật khẩu đã được thay đổi'
						};

						resolve(result);
					}
				});
			}
			else{
				let result = {
					status : 'failed',
					message: 'Tài khoản không tồn tại',
				}
			}
		});
	});
}

function userVerify(username, email){
	return new Promise((resolve, reject) => {
		let query = "SELECT * FROM account WHERE username=?";
		let params = [username];

		db.query(query, params, (err, res) => {
			if (err){
				throw err;
			}

			let result = {
				status : 'success',
				message: '',
				email: email
			};

			console.log(res);
			if (res.length > 0){
				let reg_email = res[0].email;

				if (reg_email === email){
					result.status = 'success';
					result.message = 'Hợp lệ';
				}
				else{
					result.status = 'failed';
					result.message = 'Sai email';
				}
				resolve(result);
			}
			else{
				result.status = 'failed';
				result.message = 'Không tìm thấy tài khoản';

				resolve(result);
			}
		});
	});
}

function accountVerify(username, email, token){
	return new Promise((resolve, reject) => {
		console.log("account: " ,username, email, token);
		let query = "SELECT * FROM account WHERE username=?";
		let params = [username, email, token];
		db.query(query, params, (err, res) => {
			if (err){
				throw (err);
			}

			console.log(res);
			if (res.length > 0){
				let level = res[0].level;
				let entity = {
					level: 1,
					username: username,
				};

				let result = {
					status: "success",
					message: "",
				}

				if (level === -1 ){
					dbbase.updatetb('account', 'level', 'username', entity);
					result.message = 'Verify successfully';
				}
				else{
					result.message = 'This account is already actived';
				}

				resolve(result);
			}
			else{
				let result = {
					status: "failed",
					message: "Cannot find any account",

				}
				resolve('Cannot find any account');
			}
		})
	});
}

function accountLogin(username, password){
	return new Promise((resolve, reject) => {
		let query = "SELECT * FROM account WHERE username=?";
		let param = [username];
		db.query(query, param, (err, res) => {
			if (err){
				throw err;
			}

			if (res.length > 0){
				console.log(res[0]);
				let hash = res[0].password;
				let level = res[0].level;
				let flname = res[0].flname;
				let alias = res[0].alias;
				let premium_expired = res[0].premium_expired;
				let birthday = res[0].birthday;
				let token = res[0].token;
				let email = res[0].email;
				let id = res[0].id;
				let is_login = (new Int16Array(res[0].is_login))[0];
				console.log("is_login:",is_login);
				let result = {
					status : 'success',
					message : '',
					username: username,
					alias: alias,
					premium_expired: premium_expired,
					flname: flname,
					level: level,
					birthday : birthday,
					token: token,
					email: email,
					id: id,
				}
				bcrypt.compare(password, hash).then((match) => {
					if (match){
						if (level === -1){
							result.status = 'failed';
							result.message = 'Tài khoản chưa được kích hoạt';
						}
						else if (is_login === 0){
							let entity = {
								is_login: 1,
								username: username
							}
							result.message = 'Đăng nhập thành công'
							dbbase.updatetb('account', 'is_login', 'username', entity);
						}
						else{
							result.status = 'failed';
							result.message = 'Tài khoản đã được đăng nhập';
						}
					}
					else{
						result.status = 'failed';
						result.message = 'Sai tên tài khoản hoặc mật khẩu';
					}

					resolve(result);
				});
			}
			else{
				let result = {
					status: 'failed',
					message: 'Sai tên tài khoản hoặc mật khẩu'
				}

				resolve(result);
				//resolve('Account is not exist');
			}
		});
	});
}

function logoutAll(){
	return new Promise((resolve, reject) => {
		let query = "UPDATE account SET is_login = 0";
		db.query(query, (err, res) => {
			if (err){
				throw err;
			}

			resolve('Đăng xuất tất cả thành công');
		})
	});
}

function accountLogout(username){
	return new Promise((resolve, reject) => {
		let query = "SELECT * FROM account WHERE username=?";
		let param = [username];
		db.query(query, param, (err, res) => {
			if (err){
				throw err;
			}
			
			if (res.length > 0){
				console.log(res[0]);
				let is_login = (new Int16Array(res[0].is_login))[0];
				let result = {
					status : 'success',
					message : '' 
				}

				if (is_login === 1){
					let entity = {
						is_login: 0,
						username: username,
					};

					result.status ='success';
					result.message = 'Đăng xuất thành công';
					dbbase.updatetb('account', 'is_login', 'username', entity);
				}
				else{
					result.status ='failed';
					result.message = 'Tài khoản đã thoát';
				}

				resolve(result);
			}
			else{
				let result = {
					status: 'failed',
					message: 'Tài khoản không tồn tại'
				}

				resolve(result);
			}
		});
	});
}

passport.use(new LocalStrategy(
    (username, password, done) => {
       findUser(username, (err, user) => {
         if (err) {
           return done(err)
         }
   
         // User not found
         if (!user) {
           return done(null, false)
         }
   
         // Always use hashed passwords and fixed time comparison
         bcrypt.compare(password, user.passwordHash, (err, isValid) => {
           if (err) {
             return done(err)
           }
           if (!isValid) {
             return done(null, false)
           }
           return done(null, user)
         })
       })
     }
));

/* passport.use(new FacebookStrategy({
    clientID: FACEBOOK_APP_ID,
    clientSecret: FACEBOOK_APP_SECRET,
    callbackURL: "http://www.example.com/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOrCreate(... function(err, user) {
      if (err) { return done(err); }
      done(null, user);
    });
  }
)); */

function generate_token(){
    return new Promise((resolve, reject) => {
        let token;

        crypto.randomBytes(48, function(err, buffer){
            token = buffer.toString('hex');
            resolve(token);
        });

    });
}

module.exports = {
  accountLogin : accountLogin,
  accountLogout : accountLogout,
  accountVerify: accountVerify,
  accountRegister : accountRegister,
  acoountResetPassword: accountResetPassword,
  accountChangePassword : accountChangePassword,
  userVerify : userVerify,
  logoutAll: logoutAll,
}

