var db = require('./dbbase');

function all(cat){
    return  db.loaddb(`SELECT * FROM article_pending WHERE (state=0 OR state=2) AND cat='${cat}' ORDER BY ID DESC`);
};

function preview(id){
    return db.loaddb(`SELECT * FROM article_pending WHERE ID = ${id}`);
}

function getAsign(username){
    return db.loaddb(`SELECT asign FROM account WHERE username  = '${username}'`);
}
module.exports = {
    all:all,
    preview: preview,
    getAsign:getAsign,
}