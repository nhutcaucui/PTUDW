var db = require('./index.js');

module.exports = {
    hot: ()=>{
        return db.loaddb("select *,DATE_FORMAT(date,'%d/%m/%Y') AS fDate from article order by date DESC, view DESC  limit 4");
    },

    top: ()=>{
        return db.loaddb("select *,DATE_FORMAT(date,'%d/%m/%Y') AS fDate from article order by view DESC limit 10");
    },

    new: ()=>{
        return db.loaddb("select *,DATE_FORMAT(date,'%d/%m/%Y') AS fDate from article order by fDate DESC limit 10");
    },

    cat: () =>{
        return db.loaddb("SELECT  a.*,DATE_FORMAT(date,'%d/%m/%Y') AS fDate FROM article a INNER JOIN ( SELECT subcat, MAX(VIEW) max_ID FROM article GROUP BY subcat ) b ON  a.subcat = b.subcat AND a.view = b.max_ID");
    }
}