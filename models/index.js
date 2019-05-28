var self = this;
const mysql = require('mysql');
require('./user');
self.database = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: ""
});

// self.database.connect(()=>{
//     if (err){
//         throw err;
//     }
//     console.log("[Database] - Connected");
// });

module.exports = {
    mysql : mysql,
}