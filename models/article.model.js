var db = require('./dbbase');

function all(id){
    return db.loaddb(`select *, DATE_FORMAT(date,'%d/%m/%Y') AS fDate from article where ID = ${id}`);
}

function relevant(id){
    return db.loaddb(`SELECT header, image, ID FROM article WHERE cat = (SELECT cat FROM article WHERE ID=${ID}) AND ID NOT IN (SELECT ID FROM article WHERE ID = ${ID}) LIMIT 5`);
}

function comment(id){

}

function breadCat(id){
    return db.loaddb(`select c.ID from category c, article a where a.ID = ${id} and a.cat=name`);
}

function breadSubCat(id){
    return db.loaddb(`select sc.ID from subcategory sc, article a where a.ID = ${id} and a.subcat=name`);
}

function byCat(id){
    return db.loaddb(`select *, DATE_FORMAT(date,'%d/%m/%Y') AS fDate from article, category where cat = category.name and category.ID=${id} limit 3`);
}

function bySubCat(id){
    return db.loaddb(`select *, DATE_FORMAT(date,'%d/%m/%Y') AS fDate from article, subcategory where subcat = subcategory.name and subcategory.ID=${id} limit 3`);
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