var db = require('./index.js');

module.exports = {
    allCat: ()=>{
        return  ('SELECT * FROM category');
    },

    subCatbyCat: ()=>{
        return db.loaddb('SELECT c.ID AS catID, c.name AS catName, sc.name AS subName, sc.ID AS subID , belongto FROM category c, subcategory sc WHERE belongto=c.ID');
    }
}