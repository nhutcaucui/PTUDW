var db= require('./index.js');

module.exports = {
add: entity => {
    return db.add('account', entity);
  },

  singleByUserName: userName => {
    return db.loaddb(`select * from account where username = '${userName}'`);
  },
}