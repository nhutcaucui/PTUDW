var self = this;
const mysql = require('mysql');
require('./user');
var database = mysql.createConnection({
    host: "sulnwdk5uwjw1r2k.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
    user: "cv04hmy6cj0pwz6r",
    password: "pk2fczqoz9g8z6s1"
});

var db = database.connect((err) =>{
    if (err){
        throw err;
    }
    console.log("[Database] - Connected");
});

module.exports = {
    mysql : db,
}