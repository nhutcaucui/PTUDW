var db = require('./dbbase');

function all(cat){
    return  db.loaddb(`SELECT * FROM article_pending WHERE state=0 AND cat='${cat}' ORDER BY ID DESC`);
};

function preview(id){
    return db.loaddb(`SELECT * FROM article_pending WHERE ID = ${id}`);
}
module.exports = {
    all:all,
    preview: preview
}