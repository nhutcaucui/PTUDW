var db = require('./dbbase');
function hot(){
    return db.loaddb("SELECT *,DATE_FORMAT(date,'%d/%m/%Y') AS fDate FROM article ORDER BY date DESC, view DESC  LIMIT 4");
}

function top(){
    return db.loaddb("SELECT *,DATE_FORMAT(date,'%d/%m/%Y') AS fDate FROM article ORDER BY view DESC LIMIT 10");
}

function news(){
    return db.loaddb("SELECT *,DATE_FORMAT(date,'%d/%m/%Y') AS fDate FROM article ORDER BY fDate DESC LIMIT 10");
}

function cats(){
    return db.loaddb("SELECT  a.*,DATE_FORMAT(date,'%d/%m/%Y') AS fDate FROM article a INNER JOIN ( SELECT subcat, MAX(VIEW) max_ID FROM article GROUP BY subcat ) b ON  a.subcat = b.subcat AND a.view = b.max_ID");
}

function getAll(){

    return new Promise((resolve, reject) => {
        hot().then(hrows =>{
            top().then(trows =>{
              news().then(nrows =>{
                cats().then(crows =>{
                  let result = {
                    status: 'success',
                    hot: hrows,
                    top: trows,
                    news: nrows,
                    cats: crows,
                  }

                  resolve(result);
                }).catch(err => {
                  console.log(err);
                });
              }).catch(err => {
                console.log(err);
              });
            }).catch(err => {
              console.log(err);
            });
          }).catch(err => {
            console.log(err);
        });
    });
    
}

module.exports = {
    hot: hot,
    top: top,
    news: news,
    cats: cats,
    getAll: getAll
}