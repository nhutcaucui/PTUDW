var db = require('./index.js');

module.exports = {
    all: id=>{
        return db.loaddb(`select *, DATE_FORMAT(date,'%d/%m/%Y') AS fDate from article where ID = ${id}`);
    },

    relevant: ID=>{
        return db.loaddb(`SELECT header, image, ID FROM article WHERE cat = (SELECT cat FROM article WHERE ID=${ID}) AND ID NOT IN (SELECT ID FROM article WHERE ID = ${ID}) LIMIT 5`);
    },

    comment:id=>{
        return db.loaddb(`select *, DATE_FORMAT(date,'%d/%m/%Y') AS fDate from comment where articleID = ${id}`);
    },

    breadCat:id=>{
        return db.loaddb(`select c.ID from category c, article a where a.ID = ${id} and a.cat=name`);
    },

    breadSubCat:id=>{
        return db.loaddb(`select sc.ID from subcategory sc, article a where a.ID = ${id} and a.subcat=name`);
    },

    byCat: id=>{
        return db.loaddb(`select *, DATE_FORMAT(date,'%d/%m/%Y') AS fDate from article, category where cat = category.name and category.ID=${id} limit 3`);
    },
    
    bySubCat: id=>{
        return db.loaddb(`select *, DATE_FORMAT(date,'%d/%m/%Y') AS fDate from article, subcategory where subcat = subcategory.name and subcategory.ID=${id} limit 3`);
    },
}