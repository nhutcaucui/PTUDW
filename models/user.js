const bcrypt = require('bcryptjs');
const mysql = require('mysql');

const SALT_ROUNDS = 10;

var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: ""
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});