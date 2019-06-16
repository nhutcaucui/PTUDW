var db = require('./dbbase');

function all(){
    return  db.loaddb('SELECT * FROM article_pending ORDER BY ID DESC LIMIT 3');
};

function preview(id){
    return db.loaddb(`SELECT * FROM article_pending WHERE ID = ${id}`);
}
module.exports = {
    all:all,
    preview: preview
}