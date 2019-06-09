var db = require('./index.js');

module.exports = {
    all: ()=>{
        return db.load(`select *, DATE_FORMAT(date,'%d/%m/%Y') AS fDate from article where ID = ${id}`);
    },

    relevant: ()=>{
        return db.load(`select header, image, ID from article where cat = ${cat} limit 5`);
    },

    comment:()=>{
        return db.load(`select *, DATE_FORMAT(date,'%d/%m/%Y') AS fDate from comment where articleID = ${id}`);
    },

    breadCat:()=>{
        return db.load(`select ID from category where cat = ${cat}`);
    },

    breadSubCat:()=>{
        return db.load(`select ID from subcategory where cat = ${subcat}`);
    },

    byCat: ()=>{
        return db.load(`select *, DATE_FORMAT(date,'%d/%m/%Y') AS fDate from article, category where cat = category.name and category.ID=${id} limit 3`);
    },
    
    bySubCat: ()=>{
        return db.load(`select *, DATE_FORMAT(date,'%d/%m/%Y') AS fDate from article, subcategory where subcat = subcategory.name and subcategory.ID=${id} limit 3`);
    },
}