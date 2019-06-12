var self = this;

const mysql = require('mysql');

var database = mysql.createConnection({
    host: "sulnwdk5uwjw1r2k.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
    user: "cv04hmy6cj0pwz6r",
    password: "pk2fczqoz9g8z6s1",
    database: "rs7drnwynwen7d4a",
});

// var database = createConnection = () => {
//     return mysql.createConnection({
//         host: "localhost",
//         user: "root",
//         password: "",
//         database: 'news'
//     });
// }

database.connect((err) =>{
    if (err){
        throw err;
    }
    console.log("[Database] - Connected");
});

module.exports = {
    mysql : database,
}
  
