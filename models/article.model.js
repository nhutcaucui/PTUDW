var db = require('./index.js');

module.exports = {
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
}