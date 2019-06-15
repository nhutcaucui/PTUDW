var express = require('express');
var router = express.Router();

var writerModel=require('../../models/writer.model');
var newAr=require('../../models/newarticle');

var multer = require("multer");
var path = require("path");

router.get('/new', (req,res)=>{
    var c=writerModel.getCat();
    var sc=writerModel.getSubCat();
    var i=0;
        c.then(crow=>{                                  
               sc.then(loop=>{
                var objects={title: 'Bài viết mới', cat:crow, subcat:loop, username: '',};                 
                    res.render('writer/new-article', objects);   
               }).catch(err => {
                console.log(err);
              });                                                  
        }).catch(err => {
            console.log(err);
          });       
})


  var storage = multer.diskStorage({
    filename: function (req, file, cb) {
      cb(null, path.basename(file.originalname, path.extname(file.originalname)) + Date.now() + path.extname(file.originalname));
    },
    destination: function (req, file, cb) {
      cb(null, `./public/imgs/`);
    },
  });

  var upload = multer({ storage:storage })

router.route("/new").post(upload.single("image"),(req,res)=>{  
  console.log(req.file.filename);
    let header=req.body.header;
    let content=req.body.content;
    let abstract=req.body.abstract;
    let image='/public/imgs/' + req.file.filename;
    let cat=req.body.cat;
    let subcat=req.body.subcat;
    let writerId= 1//account.id;

    newAr.addPending(header,content,abstract,image,cat,subcat,writerId);

    res.redirect("/");
})

router.get('/my-article', (req,res)=>{
    var a=writerModel.all();
    a.then(row=>{
        res.render('writer/my-article', {title: 'Bài viết của tôi', pending: row});
    }).catch(err => {
        console.log(err);
      });
    
})

module.exports = router;