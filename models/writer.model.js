var db=require('./dbbase');

function all(userID){
    return db.loaddb(`SELECT * FROM article_pending WHERE writerId =${userID}`);
}

module.exports={
    all: all,
}