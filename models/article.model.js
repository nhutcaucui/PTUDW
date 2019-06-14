var db = require('./dbbase');

function all(id){
    return db.loaddb(`SELECT *, DATE_FORMAT(date,'%d/%m/%Y') AS fDate FROM article WHERE ID = ${id}`);
}

function relevant(id){
    return db.loaddb(`SELECT header, image, ID FROM article WHERE cat = (SELECT cat FROM article WHERE ID=${id}) AND ID NOT IN (SELECT ID FROM article WHERE ID = ${id}) LIMIT 5`);
}

function comment(id){
    return db.loaddb(`SELECT *, DATE_FORMAT(date,'%d/%m/%Y') AS fDate FROM comment WHERE articleID =${id}`);
}

function breadCat(id){
    return db.loaddb(`SELECT c.ID FROM category c, article a WHERE a.ID = ${id} and a.cat=name`);
}

function breadSubCat(id){
    return db.loaddb(`SELECT sc.ID FROM subcategory sc, article a WHERE a.ID = ${id} and a.subcat=name`);
}

function byCat(id){
    return db.loaddb(`SELECT *, DATE_FORMAT(date,'%d/%m/%Y') AS fDate FROM article, category WHERE cat = category.name and category.ID=${id} LIMIT 3`);
}

function bySubCat(id){
    return db.loaddb(`SELECT *, DATE_FORMAT(date,'%d/%m/%Y') AS fDate FROM article, subcategory WHERE subcat = subcategory.name and subcategory.ID=${id} LIMIT 3`);
}

module.exports = {
    all: all,
    relevant: relevant,
    comment: comment,
    breadCat: breadCat,
    breadSubCat: breadSubCat,
    byCat: byCat,
    bySubCat: bySubCat,
    
}