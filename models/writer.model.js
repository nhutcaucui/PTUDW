var db=require('./dbbase');

function all(userID){
    return db.loaddb(`SELECT * FROM article_pending WHERE writerId =${userID}`);
}

function getCat () {
    return db.loaddb('SELECT * FROM category');
}

function getSubCat () {
    return db.loaddb(`SELECT * FROM subcategory`);
}

module.exports={
    all: all,
    getCat: getCat,
    getSubCat:getSubCat,
}