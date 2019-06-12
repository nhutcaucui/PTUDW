var db= require('./dbbase');

module.exports = {
add: entity => {
    return db.add('account', entity);
  },

  singleByUserName: userName => {
    return db.loaddb(`SELECT * FROM account WHERE username = '${userName}'`);
  },
}