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

function byCat(id, limit, offset){
    return dbbase.loaddb(`SELECT a.* FROM article a, category WHERE cat = category.name and category.ID=${id} LIMIT ${limit} OFFSET ${offset}`);
}

function countByCat(id){
    return dbbase.loaddb(`select count(*) as total FROM article a, category WHERE cat = category.name and category.ID=${id}`);
}

function bySubCat(id, limit, offset){
    return dbbase.loaddb(`SELECT a.* FROM article a, subcategory WHERE subcat = subcategory.name and subcategory.ID=${id} LIMIT ${limit} OFFSET ${offset}`);
}

function countBySubCat(id){
    return dbbase.loaddb(`select count(*) as total FROM article a, subcategory WHERE subcat = subcategory.name and subcategory.ID=${id}`);
}

function search(matchs, againts){
    return new Promise((resolve, reject) => {
        let query = "SELECT * FROM article WHERE MATCH(header) AGAINST('123')";
        let match = matchs[0];
        let againt = againts[0];

        for (let loop = 1; loop < matchs.length; loop++){
            match = match + ',' + matchs[loop];
        }

        for (let loop = 1; loop < againts.length; loop++){
            againt = againt + ',' + againts[loop];
        }

        let params = [againts, againts, againts];

        db.query(query, params, (err, res) => {
            if (err){
                throw err;
            }
            
            let result ={
                status: 'success',
                message: '',
                articles: '',
            }

            if (res.length > 0){
                result.message = 'Tìm kiếm thành công';
                result.articles = res;

                resolve(result);
            }
            else{
                result.status = 'failed';
                result.message = 'Không tìm thấy kết quả nào';

                resolve(result);
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
    countByCat:countByCat,
    countBySubCat:countBySubCat,
}