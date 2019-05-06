const express = require('express');
const path = require('path')
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const passport = require('passport');
const log4js = require('log4js');
const session = require('express-session');
const ejs = require('ejs');

const app = express();
require('./init');

app.use(favicon(path.join(__dirname, 'public', 'favicons/favicon.ico')));
app.use(log4js.connectLogger(logger.instanceRequest()));
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/theme', express.static(path.join(__dirname, 'theme')));
app.use('/dist', express.static(path.join(__dirname, 'dist')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());

module.exports = app;