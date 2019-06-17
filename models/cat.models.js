var db = require('./dbbase');

module.exports = {
    allCat: ()=>{
        return  db.loaddb('SELECT * FROM category');
    },

    allSubCat:()=>{
        return db.loaddb('SELECT * FROM subcategory');
    },

    subCatbyCat: ()=>{
        return db.loaddb('SELECT c.ID AS catID, c.name AS catName, sc.name AS subName, sc.ID AS subID , belongto FROM category c, subcategory sc WHERE belongto=c.ID');
    },
}