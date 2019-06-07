const bcrypt = require('bcryptjs');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const SALT_ROUNDS = 10;

function new_user(username, password, role){
    bcrypt.hash(password, SALT_ROUNDS, (err, hash) =>{
        console.log(hash);
    });
}

function verify(password, hash){
    bcrypt.compare(password, hash, (err, res) => {
        if (res){
            console.log('Yes, indeed');
        } else{
            console.log('No u');
        }
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
verify('meomeomeo', '$2a$10$rqNNDhzSOmHnB/tega5kE.BpW5ALiAY9XNx5bNZ0qou8EOMEaQvli');
new_user('hi mom', 'meomeomeo', '');