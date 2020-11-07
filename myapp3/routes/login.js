var express = require("express");
var router = express.Router();
const user = require("../sql/user");


router.get("/", function (req, res, next) {
     console.log('进来login路由的/里面了')
  
      res.render("login" );
    });


    router.post("/in", function (req, res, next) {
        console.log('进来login 路由了 /in了 ')
         console.log(req.body)
         user.findOne({username:req.body.username,password:req.body.password},(err,data)=>{
             if(err){
                 console.log(err)
             }
             if(data) {
                //  res.cookie('islogin','ok')
                req.session.islogin = 'ok'
                console.log('我在login路由 /in')
                console.log(req.session.islogin)
                 res.redirect('/')
             }else {
                 res.redirect('/register')
             }
         }) 
         
      });




module.exports = router;