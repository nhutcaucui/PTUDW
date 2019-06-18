const express = require('express');
const path = require('path')
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const passport = require('passport');
const log4js = require('log4js');
const session = require('express-session');
const ejs = require('ejs');
var userdb = require('./models/user');
var global = require('./global');
var ejsLayout = require('express-ejs-layouts');
var flash=require('connect-flash')
var cookieParser = require('cookie-parser');

const app = express();

require('./models/index');
//require('./init');

//app.use(favicon(path.join(__dirname, 'public', 'favicons/favicon.ico')));
//app.use(log4js.connectLogger(logger.instanceRequest()));
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/theme', express.static(path.join(__dirname, 'theme')));
app.use('/dist', express.static(path.join(__dirname, 'dist')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(ejsLayout);
app.use(require('./mdw/localcat.mdw'));
app.use(require('./mdw/localsubcat.mdw'));
app.use(require('./mdw/localuser.mdw'))
app.use(cookieParser());
require('./mdw/session')(app);

app.set('view engine', 'ejs');
app.set("layout extractScripts", true);
app.set("layout extractStyles", true);

var homeModel= require('./models/home.model');

app.get('/', function(req, res) {
	homeModel.getAll().then(result => {
		if (result.status.toLowerCase().localeCompare('success') === 0){
			global.hot = result.hot;
          	global.top = result.top;
          	global.news = result.news;
			global.cats = result.cats;
			  
			let params = {
				title: 'Trang chủ',
				hot: global.hot,
				top: global.top,
				news: global.news,
				cats: global.cats,
			};

			res.render('home', params);
		}
	});
    
});

app.use('/', require('./routes/user.routes'));
app.use('/search', require('./routes/search.routes'));
app.use('/profile', require('./routes/profile.routes'));
app.use('/article', require('./routes/article.routes'));
app.use('/category', require('./routes/category.routes'));
app.use('/writer', require('./routes/writer/writer.routes'));
app.use('/admin', require('./routes/admin/admin.routes'));
app.use('/editor', require('./routes/editor/editor.routes'));

app.use((req, res, next) => {
    res.render('404', { layout: false });
});
  
app.use((error, req, res, next) => {
    res.render('error', {
      layout: false,
      message: error.message,
      error
    });
});

app.get('/', (req, res) => {
	console.log('hi mom');	
	res.render('home');
});

	// userdb.logoutAll().then(result => {
	// 	console.log(result);
	// });


app.listen(8081);

module.exports = app;