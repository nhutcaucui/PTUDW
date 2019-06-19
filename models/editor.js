var dbbase = require('./dbbase');
var moment = require('moment');
var dt=require('../utils/datetime')

function passAndPublic(header,content,abstract,image,cat,subcat,writerid,tag,premium,id){
    console.log(header,content,abstract,image,cat,subcat,writerid,tag);
    let entity = {
        header: header,
        content: content,
        abstract: abstract,
        image: image,
        view:0,
        date:dt.date2unix(moment(Date.now(),'dd/mm/yyyy')),
        cat: cat,
        subcat: subcat,
        writerId: writerid,
        tag:tag,
        premium:premium,
    }
    dbbase.addtb('article', entity);

    let entity2={
        state:1,
    }
    dbbase.updatetbbyid('article_pending',id,entity2)
}

function deny(id){
    let entity = {
        state:2,
    }
    dbbase.updatetbbyid('article_pending',id,entity);
}

function makePremium(id){
    let entity={
        premium:1,
    }
    dbbase.updatetb('article',entity,id,entity)
}

module.exports={
    passAndPublic:passAndPublic,
    makePremium:makePremium,
    deny:deny,
}