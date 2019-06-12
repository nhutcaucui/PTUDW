var db = require('./index.js');

module.exports = {
    all: ()=>{
        return  db.loaddb('SELECT * FROM article_pending LIMIT 3');
    },
}