var express = require('express');
var router = express.Router();

var writerModel=require('../../models/writer.model');
var newAr=require('../../models/newarticle');

var multer = require("multer");
var path = require("path");
const fs = require('fs');

router.get('/new', (req,res)=>{
    var c=writerModel.getCat();
    var sc=writerModel.getSubCat();
    var i=0;
        c.then(crow=>{                                  
               sc.then(loop=>{
                var objects={title: 'Bài viết mới', cat:crow, subcat:loop, edit:false};                 
                    res.render('writer/new-article', objects);   
               }).catch(err => {
                console.log(err);
              });                                                  
        }).catch(err => {
            console.log(err);
          });       
})

router.get('/edit/:id', (req,res)=>{
  var id=req.params.id;
  var a=writerModel.getAr(id);
  var c=writerModel.getCat();
  var sc=writerModel.getSubCat();
  var i=0;
      c.then(crow=>{                                  
             sc.then(loop=>{
               a.then(arow=>{
                var objects={title: 'Sửa bài viết', cat:crow, subcat:loop, username: '', aredit:arow, edit:true};                 
                res.render('writer/new-article', objects);
               }).catch(err => {
                console.log(err);
              });                 
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
  var ID = writerModel.getIdWithUsername(req.session.username);
  ID.then(rows=>{
    rows.forEach(row=>{
    let header=req.body.header;
    let content=req.body.content;
    let abstract=req.body.abstract;
    let image='/public/imgs/' + req.file.filename;
    let cat=req.body.cat;
    let subcat=req.body.subcat;
    let writerId= row.ID;
    let tag=req.body.tag;

    newAr.addPending(header,content,abstract,image,cat,subcat,writerId,tag);

    res.redirect("/");
  })});
})

router.route("/edit/:id").post(upload.single("image"),(req,res)=>{
  
    var i=writerModel.getImageDir(req.params.id)
    i.then(irow=>{
      irow.forEach(element => {
        fs.unlink('.'+element.image,(err) => {
          if (err) throw err;
          console.log('.'+element.image);
          console.log('deleted');
        });
      });
    }).catch(err => {
      console.log(err);
    }); 
    
    var ID = writerModel.getIdWithUsername(req.session.username);
    ID.then(rows=>{
      rows.forEach(row=>{
      let header=req.body.header;
      let content=req.body.content;
      let abstract=req.body.abstract;
      let image='/public/imgs/' + req.file.filename;
      let cat=req.body.cat;
      let subcat=req.body.subcat;
      let writerId= row.ID;
      let tag=req.body.tag;

    newAr.updatePending(header,content,abstract,image,cat,subcat,writerId,tag,req.params.id);

    res.redirect("/");
      })
    }).catch(err => {
      console.log(err);
    });   
})

router.get('/my-article', (req,res)=>{
  var ID = writerModel.getIdWithUsername(req.session.username);
  ID.then(rows=>{
    rows.forEach(row=>{
      var a=writerModel.all(row.ID);
    a.then(row=>{
        res.render('writer/my-article', {title: 'Bài viết của tôi', pending: row});
    }).catch(err => {
        console.log(err);
      });
    })
  }).catch(err => {
    console.log(err);
  });
    
    
})

module.exports = router;