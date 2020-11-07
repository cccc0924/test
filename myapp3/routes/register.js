var express = require("express");
var router = express.Router();
const user = require("../sql/user");


router.get("/", function (req, res, next) {
     console.log('进来register路由的/里面了')
  
      res.render("register", {
        index: 2,
        
      });
    });


    router.post("/in", function (req, res, next) {
        console.log('进来login 路由了 /in了 ')
         console.log(req.body)
         user.insertMany(req.body,(err,data)=>{
             if(err){
                 console.log(err)
             }
             console.log('数据库成功了')
             console.log(data)
               res.redirect('/login')
         })
         
      });




module.exports = router;