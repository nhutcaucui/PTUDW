var db = require('./index').mysql;
var dbbase = require('./dbbase');

function addPending(header,content,abstract,image,cat,subcat,writerid){
    console.log(header,content,abstract,image,cat,subcat,writerid);
    let entity = {
        header: header,
        content: content,
        abstract: abstract,
        image: image,
        cat: cat,
        subcat: subcat,
        writerId: writerid,
    }
    dbbase.addtb('article_pending', entity);
}

function updatePending(header,content,abstract,image,cat,subcat,writerid){
    console.log(header,content,abstract,image,cat,subcat,writerid);
    let entity = {
        header: header,
        content: content,
        abstract: abstract,
        image: image,
        cat: cat,
        subcat: subcat,
        writerId: writerid,
    }
    dbbase.updatetb('article_pending', entity);
}

module.exports={
    addPending:addPending,
    updatePending:updatePending,
}