var db = require('./index.js');

module.exports = {
    allCat: ()=>{
        return  ('select * from category');
    },

    subCatbyCat: ()=>{
        return db.loaddb('select c.ID as catID, c.name as catName, sc.name as subName, sc.ID as subID , belongto from category c, subcategory sc where belongto=c.ID');
    }
}