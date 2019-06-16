var db=require('./dbbase');

function getCat(){
    return db.loaddb('SELECT * FROM category');
}

function getSubCat(){
    return db.loaddb('SELECT * FROM subcategory');
}

function getUsername(){
    return db.loaddb('SELECT username, level FROM account');
}

function getAr(){
    return db.loaddb('SELECT * FROM article_pending WHERE state=0 ORDER BY ID DESC LIMIT 5');
}

function getTag(){
    return db.loaddb('SELECT tag, header FROM article LIMIT 5');
}

module.exports={
    getCat:getCat,
    getSubCat:getSubCat,
    getAr:getAr,
    getUsername:getUsername,
    getTag:getTag,
}