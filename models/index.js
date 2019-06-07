var self = this;
const mysql = require('mysql');
require('./user');
var database = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: ""
});

var db = database.connect(()=>{
    if (err){
        throw err;
    }
    console.log("[Database] - Connected");
});

module.exports = {
    mysql : db,
}