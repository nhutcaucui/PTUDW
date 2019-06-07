var self = this;
var db;
const mysql = require('mysql');
require('./user');

var database = mysql.createConnection({
    host: "sulnwdk5uwjw1r2k.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
    user: "cv04hmy6cj0pwz6r",
    password: "pk2fczqoz9g8z6s1"
});

// var database = createConnection = () => {
//     return mysql.createConnection({
//         host: "localhost",
//         user: "root",
//         password: "",
//         database: 'news'
//     });
// }

// var db = database.connect((err) =>{
//     if (err){
//         throw err;
//     }
//     console.log("[Database] - Connected");
// });

module.exports = {
    mysql : db,
}
  //   load: sql => {
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
  
  //   add: (tableName, entity) => {
  //     return new Promise((resolve, reject) => {
  //       var sql = `insert into ${tableName} set ?`;
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
  
  //   update: (tableName, idField, entity) => {
  //     return new Promise((resolve, reject) => {
  //       var id = entity[idField];
  //       delete entity[idField];
  
  //       var sql = `update ${tableName} set ? where ${idField} = ?`;
  //       var connection = createConnection();
  //       connection.connect();
  //       connection.query(sql, [entity, id], (error, value) => {
  //         if (error)
  //           reject(error);
  //         else {
  //           resolve(value.changedRows);
  //         }
  //         connection.end();
  //       });
  //     });
  //   },
  
  //   delete: (tableName, idField, id) => {
  //     return new Promise((resolve, reject) => {
  //       var sql = `delete from ${tableName} where ${idField} = ?`;
  //       var connection = createConnection();
  //       connection.connect();
  //       connection.query(sql, id, (error, value) => {
  //         if (error)
  //           reject(error);
  //         else {
  //           resolve(value.affectedRows);
  //         }
  //         connection.end();
  //       });
  //     });
  //   },
  // };
