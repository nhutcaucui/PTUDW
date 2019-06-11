var mysql = require('./index').mysql;

function loaddb(sql){
    return new Promise((resolve, reject) => {
      var connection = createConnection();
      connection.query(sql, (error, results, fields) => {
        if (error)
          reject(error);
        else {
          resolve(results);
        }
      });
    });
}

function addtb(tableName, entity){
    return new Promise((resolve, reject) => {
      var sql = `INSERT INTO ${tableName} SET ?`;
      var connection = createConnection();
      connection.connect();
      connection.query(sql, entity, (error, value) => {
        if (error)
          reject(error);
        else {
          resolve(value.insertId);
        }
        connection.end();
      });
    });
}
function updatetb(tableName, idField, entity){
    return new Promise((resolve, reject) => {
      var id = entity[idField];
      delete entity[idField];

      var sql = `UPDATE ${tableName} SET ? WHERE ${idField} = ?`;
      var connection = createConnection();
      connection.query(sql, [entity, id], (error, value) => {
        if (error)
          reject(error);
        else {
          resolve(value.changedRows);
        }
      });
    });
}

function deletetb(tableName, idField, id){
    return new Promise((resolve, reject) => {
      var sql = `DELETE FROM ${tableName} WHERE ${idField} = ?`;
      var connection = createConnection();
      connection.connect();
      connection.query(sql, id, (error, value) => {
        if (error)
          reject(error);
        else {
          resolve(value.affectedRows);
        }
        connection.end();
      });
    });
}

module.exports ={
    loaddb: loaddb,
    updatetb: updatetb,
    deletetb: deletetb,
    addtb: addtb,
}