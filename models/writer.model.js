var db=require('./dbbase');

function getCat () {
    return db.loaddb('SELECT * FROM category');
}

function getSubCat (id) {
    return db.loaddb(`SELECT * FROM subcategory WHERE belongto=${id}`);
}

function getNextID () {
    return db.loaddb(`SELECT T.AUTO_INCREMENT FROM information_schema.TABLES T WHERE T.TABLE_SCHEMA = 'news' AND T.TABLE_NAME = 'article_pending';`);
}

module.exports={
    all: userID =>{
        return db.loaddb(`SELECT * FROM article_pending WHERE writerId =${userID}`);
    },
    getCat: getCat,
    getSubCat:getSubCat,
    getNextID:getNextID,
}