const express = require('express');
const path = require('path')
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const passport = require('passport');
const log4js = require('log4js');
const session = require('express-session');
const ejs = require('ejs');

const app = express();

require('./models/index');
//require('./init');

//app.use(favicon(path.join(__dirname, 'public', 'favicons/favicon.ico')));
//app.use(log4js.connectLogger(logger.instanceRequest()));
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/theme', express.static(path.join(__dirname, 'theme')));
app.use('/dist', express.static(path.join(__dirname, 'dist')));
app.use('/parts', express.static('parts'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());

app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    res.render('home', {title: 'Trang chu'});
});

app.use('/login', require('./routes/login.routes'));
app.use('/article', require('./routes/article.routes'));
app.use('/category', require('./routes/category.routes'));

app.listen(8080);

module.exports = app;