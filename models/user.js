const bcrypt = require('bcryptjs');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const SALT_ROUNDS = 10;
const crypto = require('crypto');

var db = require('./index').mysql;

function accountRegister(username, password, role){
    return new Promise((resolve, reject) => {
        let query = "SELECT * FROM account WHERE username = ?";
        db.query(query, [username], (err, res) => {
    		if (err){
        		throw err;
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
				resolve(generate_token());
			}
        });
    });

    bcrypt.hash(password, SALT_ROUNDS, (err, hash) =>{
        console.log(hash);
    });
}

function accountVerify(){
	return new Promise((resolve, reject) => {
	});
}

function accountLogin(username, password){
	return new Promise((resolve, reject) => {
		let query = "SELECT * FROM account WHERE username=?";
		let param = [username];
		db.query(query, param, (err, res) => {
			if (err){
				reject(err);
			}
			if (res.length > 0){
				let hash = res.password;
				resolve(bcrypt.compare(password, "$2y$12$R3cj5newyVWoKrqiQ9HTvOPV.uCqC2TZdk8hE6qts8mX1xHMCf4du"));
			}
			else{
				resolve(bcrypt.compare(password, "$2y$12$R3cj5newyVWoKrqiQ9HTvOPV.uCqC2TZdk8hE6qts8mX1xHMCf4du"));
				//resolve('Account is not exist');
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

module.exports = {
  new_user : new_user,
  accountLogin : accountLogin,

}

function generate_token(){
    return new Promise((resolve, reject) => {
        let token;

        crypto.randomBytes(48, function(err, buffer){
            token = buffer.toString('hex');
            resolve(token);
        });

    });
}