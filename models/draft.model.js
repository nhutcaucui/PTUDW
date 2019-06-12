var db = require('./dbbase');

module.exports = {
    all: ()=>{
        return  db.loaddb('SELECT * FROM article_pending LIMIT 3');
    },
}