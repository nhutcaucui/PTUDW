var db=require('./dbbase');

function all(userID){
    return db.loaddb(`SELECT * FROM article_pending WHERE writerId =${userID} ORDER BY ID DESC`);
}

function getCat () {
    return db.loaddb('SELECT * FROM category');
}

function getSubCat () {
    return db.loaddb(`SELECT * FROM subcategory`);
}

function getAr(id){
    return db.loaddb(`SELECT * FROM article_pending WHERE ID =${id}`);
}

function getImageDir(id){
    return db.loaddb(`SELECT image FROM article_pending WHERE ID =${id}`);
}

module.exports={
    all: all,
    getCat: getCat,
    getSubCat:getSubCat,
    getAr:getAr,
    getImageDir:getImageDir,
}