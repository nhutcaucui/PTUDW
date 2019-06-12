var db=require('./dbbase');

module.exports={
    all: userID =>{
        return db.loaddb(`SELECT * FROM article_pending WHERE writerId =${userID}`);
    }
}