var self = this;

const mysql = require('mysql');
require('./user');

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

    // loaddb: sql => {
    //     return new Promise((resolve, reject) => {
    //       var connection = createConnection();
    //       connection.connect();
    //       connection.query(sql, (error, results, fields) => {
    //         if (error)
    //           reject(error);
    //         else {
    //           resolve(results);
    //         }
    //         connection.end();
    //       });
    //     });
    //   },

    // add: (tableName, entity) => {
    //     return new Promise((resolve, reject) => {
    //       var sql = `INSERT INTO ${tableName} SET ?`;
    //       var connection = createConnection();
    //       connection.connect();
    //       connection.query(sql, entity, (error, value) => {
    //         if (error)
    //           reject(error);
    //         else {
    //           resolve(value.insertId);
    //         }
    //         connection.end();
    //       });
    //     });
    //   },
}
  
