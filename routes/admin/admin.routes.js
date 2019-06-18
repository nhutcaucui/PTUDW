var express = require('express');
var router = express.Router();

var bcrypt=require('bcryptjs');
var crypto=require('crypto');
var SALTR=10;

var adminModel = require('../../models/admin.model');
var dbbase=require('../../models/dbbase');

function generate_token(){
    return new Promise((resolve, reject) => {
        let token;

        crypto.randomBytes(48, function(err, buffer){
            token = buffer.toString('hex');
            resolve(token);
        });

    });
}

router.get('/', (req,res)=>{
    var a=adminModel.getAr();
    var c=adminModel.getCat();
    var sc=adminModel.getSubCat();
    var t=adminModel.getTag();
    var u=adminModel.getUsername();
    a.then(arows=>{
        c.then(crows=>{
            sc.then(scrows=>{
                t.then(trows=>{
                    u.then(urows=>{
                        var objects={
                            title: 'Quản lí trang',
                            article:arows,
                            cat:crows,
                            subcat:scrows,
                            tag:trows,
                            user:urows,
                        }
                        res.render('admin/manage', objects);
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
    }).catch(err => {
        console.log(err);
      });
    
})

router.post("/add-cat", (req,res)=>{
    var cat = req.body.catadd;
    adminModel.getCatByName(cat).then(rows => {
        if (rows.length > 0){
            res.render("aderror/aderror",{layout:false,object:"Chuyên mục"});
        }
            else{
                var entity={
                    name:cat,
                }
                dbbase.addtb('category', entity);
                res.redirect("/admin");
            }
      });  
})

router.post("/edt-cat", (req,res)=>{
    var catedt = req.body.catedt;
    var cat=req.body.cat;
    adminModel.getCatByName(catedt).then(rows => {
        if (rows.length > 0){
            res.render("aderror/aderror",{layout:false,object:"Chuyên mục"});
        }
        else{
            var entity={
                name:catedt,
            }
            var sql=`UPDATE category SET ? WHERE name='${cat}'`;
        
            dbbase.customupdatetb(sql, entity);
            res.redirect("/admin");
        }
    });
})

router.post("/del-cat", (req,res)=>{
    var cat=req.body.cat;
    var id;
    adminModel.getCatByName(cat).then(rows => {
        rows.forEach(row=>{
            id=row.ID;
            dbbase.deletetb('category', 'name', cat);
            dbbase.deletetb('subcategory', 'belongto',id);
            res.redirect("/admin");
        })
    });
    
    
})

router.post("/add-subcat", (req,res)=>{
    var cat = req.body.subcatadd;
    var id;
    adminModel.getCatByName(req.body.sccat).then(rows => {
        rows.forEach(element => {
            id=element.ID;
        });
    });
    adminModel.getSubCatByName(cat).then(rows => {
        if (rows.length > 0){
            res.render("aderror/aderror",{layout:false,object:"Chuyên mục"});
        }
            else{
                var entity={
                    name:cat,
                    belongto:id,
                }
                dbbase.addtb('subcategory', entity);
                res.redirect("/admin");
            }
      });  
})

router.post("/edt-subcat", (req,res)=>{
    var cat = req.body.subcatedt;
    var edt= req.body.scsubcat;
    adminModel.getSubCatByName(cat).then(rows => {
        if (rows.length > 0){
            res.render("aderror/aderror",{layout:false,object:"Chuyên mục"});
        }
            else{
                var entity={
                    name:cat,
                }
                var sql=`UPDATE subcategory SET ? WHERE name='${edt}'`;
                dbbase.customupdatetb(sql, entity);
                res.redirect("/admin");
            }
      });  
})

router.post("/del-subcat", (req,res)=>{
    var edt= req.body.scsubcat;
    dbbase.deletetb('subcategory', 'name', edt);
    res.redirect("/admin");
});

router.post("/add-ew", (req,res)=>{
    var username= req.body.username;
    var role=req.body.slew;
    adminModel.getUserByUsername(username).then(rows => {
        if (rows.length > 0){
            res.render("aderror/aderror",{layout:false,object:"Username"});
        }
            else{
                if (role=="Biên tập viên"){
                    var lvl=3;
                }
                else{
                    var lvl=2;
                }
                generate_token().then(token => {
                bcrypt.hash(req.body.password, SALTR, (err, hash) => {
                    let entity = {
                        username: username,
                        password: hash,
                        is_login: 0,
                        level: lvl,
                        token:token,
                    }               
                dbbase.addtb('account', entity);
                res.redirect("/admin");
            })
        });
            }
            
      });
});

router.post("/del-ew", (req,res)=>{
    var username= req.body.listew;
    dbbase.deletetb('account', 'username', username);
    res.redirect("/admin");
})

router.post("/ext-reader", (req,res)=>{
    var username= req.body.listreader;
    var sql=`UPDATE account SET premium_expired=premium_expired + 604800 WHERE username='${username}'`;
    var entity={
        username:username,
    }
    dbbase.customupdatetb(sql,entity);
    res.redirect("/admin");
})

router.post("/del-reader", (req,res)=>{
    var username= req.body.listreader;
    dbbase.deletetb('account', 'username', username);
    res.redirect("/admin");
})

router.post("/asign", (req,res)=>{
    var username= req.body.edtlist;
    var cat=req.body.edtcatlist;
    var sql=`UPDATE account SET asign='${cat}' WHERE username='${username}'`;
    var entity={
        username:username,
    }
    dbbase.customupdatetb(sql,entity);
    res.redirect("/admin");
})

module.exports = router;