var db = require('./index').mysql;
var dbbase = require('./dbbase');

function addPending(header,content,abstract,image,cat,subcat,writerid,tag){
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
    }
    dbbase.addtb('article_pending', entity);
}

function updatePending(header,content,abstract,image,cat,subcat,writerid,tag,id){
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
        state:0,
    }
    dbbase.updatetb('article_pending',entity,id, entity);
}

module.exports={
    addPending:addPending,
    updatePending:updatePending,
}