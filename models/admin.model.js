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
    return db.loaddb('SELECT tag, header FROM article ORDER BY date DESC LIMIT 5');
}

function getCatByName(name){
    return db.loaddb(`SELECT * FROM category where name='${name}'`);
}

function getSubCatByName(name){
    return db.loaddb(`SELECT name FROM subcategory where name='${name}'`);
}

function getUserByUsername(username){
    return db.loaddb(`SELECT username FROM account where username='${username}'`)
}

module.exports={
    getCat:getCat,
    getSubCat:getSubCat,
    getAr:getAr,
    getUsername:getUsername,
    getTag:getTag,
    getCatByName:getCatByName,
    getSubCatByName:getSubCatByName,
    getUserByUsername:getUserByUsername,
}