var db = require('./dbbase');
var dt=require('../utils/datetime');
var moment=require('moment');

function hot(){
    return db.loaddb("SELECT * FROM article ORDER BY date DESC, view DESC  LIMIT 4");
}

function top(){
    return db.loaddb("SELECT * FROM article ORDER BY view DESC LIMIT 10");
}

function news(){
    return db.loaddb("SELECT * FROM article ORDER BY date DESC LIMIT 10");
}

function cats(){
    return db.loaddb("SELECT  a.* FROM article a JOIN ( SELECT subcat, MAX(date) max_date FROM article GROUP BY subcat ) b ON  a.subcat = b.subcat AND a.date = b.max_date GROUP BY subcat LIMIT 10");
}

function getAll(){

    return new Promise((resolve, reject) => {
        hot().then(hrows =>{
          hrows.forEach(element => {
            element.date=moment(dt.unix2date(element.date)).format("DD/MM/YYYY");
          });
            top().then(trows =>{
              trows.forEach(element => {
                element.date=moment(dt.unix2date(element.date)).format("DD/MM/YYYY");
              });
              news().then(nrows =>{
                nrows.forEach(element => {
                  element.date=moment(dt.unix2date(element.date)).format("DD/MM/YYYY");
                });
                cats().then(crows =>{
                  crows.forEach(element => {
                    element.date=moment(dt.unix2date(element.date)).format("DD/MM/YYYY");
                  });
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