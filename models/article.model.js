var dbbase = require('./dbbase');
var db = require('./index').mysql;

function all(id){
    return dbbase.loaddb(`SELECT * FROM article WHERE ID = ${id}`);
}

function relevant(id){
    return dbbase.loaddb(`SELECT header, image, ID FROM article WHERE cat = (SELECT cat FROM article WHERE ID=${id}) AND ID NOT IN (SELECT ID FROM article WHERE ID = ${id}) LIMIT 5`);
}

function comment(id){
    return dbbase.loaddb(`SELECT * FROM comment WHERE articleID =${id}`);
}

function breadCat(id){
    return dbbase.loaddb(`SELECT c.ID FROM category c, article a WHERE a.ID = ${id} and a.cat=name`);
}

function breadSubCat(id){
    return dbbase.loaddb(`SELECT sc.ID FROM subcategory sc, article a WHERE a.ID = ${id} and a.subcat=name`);
}

function byCat(id){
    return dbbase.loaddb(`SELECT a.* FROM article a, category WHERE cat = category.name and category.ID=${id} LIMIT 3`);
}

function bySubCat(id){
    return dbbase.loaddb(`SELECT a.* FROM article a, subcategory WHERE subcat = subcategory.name and subcategory.ID=${id} LIMIT 3`);
}

function search(matchs, againts){
    return new Promise((resolve, reject) => {
        let query = "SELECT * FROM account WHERE MATCH(?) AGAINTS(?)";
        let match = '';
        let againt = '';

        for (let loop = 1; loop < matchs.length; loop++){
        }

        for (let loop = 1; loop < againts.length; loop++){

        }

        let params = [match, againt];

        db.query(query, params, (err, res) => {
            if (err){
                throw err;
            }

            if (res.length > 0){

            }
        });
    });
}

module.exports = {
    all: all,
    relevant: relevant,
    comment: comment,
    breadCat: breadCat,
    breadSubCat: breadSubCat,
    byCat: byCat,
    bySubCat: bySubCat,
    search : search,
}