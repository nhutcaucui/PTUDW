var db = require('./index').mysql;
var dbbase = require('./dbbase');

function addPending(header,content,abstract,image,cat,subcat,writerid,tag,premium){
    console.log(header,content,abstract,image,cat,subcat,writerid,tag);
    let entity = {
        header: header,
        content: content,
        abstract: abstract,
        image: image,
        cat: cat,
        subcat: subcat,
        writerId: writerid,
        tag:tag,
        state:0,
        premium:premium,
    }
    dbbase.addtb('article_pending', entity);
}

function updatePending(header,content,abstract,image,cat,subcat,writerid,tag,premium,id){
    console.log(header,content,abstract,image,cat,subcat,writerid,tag,id);
    let entity = {
        header: header,
        content: content,
        abstract: abstract,
        image: image,
        cat: cat,
        subcat: subcat,
        writerId: writerid,
        tag:tag,
        premium:premium,
    }
    var ID=id;
    var sql=`UPDATE article_pending SET ? WHERE ID=${ID}`
    dbbase.customupdatetb(sql, entity);
}

module.exports={
    addPending:addPending,
    updatePending:updatePending,
}