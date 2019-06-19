var express = require('express');
var router = express.Router();
var articledb = require('../models/article.model');

router.get('/', (req, res) =>{
    let againts = req.query.againts;
    let matchs = ['header', 'content', 'abstract'];
    console.log('hi mom', againts);
    articledb.search(matchs, againts).then(result => {
        if (result.status.toLowerCase().localeCompare('success') === 0){
            let params = {
                result: result.articles,
                title: 'Tìm kiếm'
            }
            console.log(result.articles);
            res.render('search/result', params);
        }
        else{
            let params = {
                title: 'Tìm kiếm'
            }
            res.render('search/result', params);
        }
    });
});

module.exports = router;
