var db = require('./index.js');

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
<<<<<<< HEAD
    all: all,
    relevant: relevant,
    comment: comment,
    breadCat: breadCat,
    breadSubCat: breadSubCat,
    byCat: byCat,
    bySubCat: bySubCat,
=======
    all: id=>{
        return db.loaddb(`SELECT *, DATE_FORMAT(date,'%d/%m/%Y') AS fDate FROM article WHERE ID = ${id}`);
    },

    relevant: ID=>{
        return db.loaddb(`SELECT header, image, ID FROM article WHERE cat = (SELECT cat FROM article WHERE ID=${ID}) AND ID NOT IN (SELECT ID FROM article WHERE ID = ${ID}) LIMIT 5`);
    },

    comment:id=>{
        return db.loaddb(`SELECT *, DATE_FORMAT(date,'%d/%m/%Y') AS fDate FROM comment WHERE articleID = ${id}`);
    },

    breadCat:id=>{
        return db.loaddb(`SELECT c.ID FROM category c, article a WHERE a.ID = ${id} AND a.cat=name`);
    },

    breadSubCat:id=>{
        return db.loaddb(`SELECT sc.ID FROM subcategory sc, article a WHERE a.ID = ${id} AND a.subcat=name`);
    },

    byCat: id=>{
        return db.loaddb(`SELECT *, DATE_FORMAT(date,'%d/%m/%Y') AS fDate FROM article, category WHERE cat = category.name AND category.ID=${id} limit 3`);
    },
    
    bySubCat: id=>{
        return db.loaddb(`SELECT *, DATE_FORMAT(date,'%d/%m/%Y') AS fDate FROM article, subcategory WHERE subcat = subcategory.name AND subcategory.ID=${id} limit 3`);
    },
>>>>>>> e9e546e1fa5113af1e2c41d15ac1b2c76d91793b
}