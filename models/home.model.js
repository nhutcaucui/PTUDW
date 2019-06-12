var db = require('./dbbase');

module.exports = {
    hot: ()=>{
        return db.loaddb("SELECT *,DATE_FORMAT(date,'%d/%m/%Y') AS fDate FROM article ORDER BY date DESC, view DESC  LIMIT 4");
    },

    top: ()=>{
        return db.loaddb("SELECT *,DATE_FORMAT(date,'%d/%m/%Y') AS fDate FROM article ORDER BY view DESC LIMIT 10");
    },

    new: ()=>{
        return db.loaddb("SELECT *,DATE_FORMAT(date,'%d/%m/%Y') AS fDate FROM article ORDER BY fDate DESC LIMIT 10");
    },

    cat: () =>{
        return db.loaddb("SELECT  a.*,DATE_FORMAT(date,'%d/%m/%Y') AS fDate FROM article a INNER JOIN ( SELECT subcat, MAX(VIEW) max_ID FROM article GROUP BY subcat ) b ON  a.subcat = b.subcat AND a.view = b.max_ID");
    }
}