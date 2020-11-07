var express = require("express");
// 建立一个空路由表
var router = express.Router();
const user = require("../sql/user");

router.get("/",function(req,res,next){
    res.render("register");
})

router.post("/in",function(req,res,next){
    console.log('进入register4的in 处理');

    let obj = req.body;
    console.log(obj)
    console.log(obj.username);
    console.log(obj.password)



// 第一种
    user.insertMany(obj,(err,data)=>{
        if(err){
            console.log(err);
        }
        if(data){
            res.redirect('/login4')
        }else{
            res.redirect('/register4')
        }
    });


});

// 解决用户重复的问题 （第二种写法)
// user.findOne({username:obj.username},(err,data)=>{
//     if(err){
//         //发送错误，写进数据库
//         console.log(err);
//     }
//     if(data){
//         res.redirect('/register4')
//     }else{
//         user.insertMany(obj,(err,data)=>{
//             if(err){
//                 console.log(err);
//             }
//             console.log(data);
//             res.redirect('/login4')
//         })
//     }
// })


// 第三种写法
// user.findOne({username:obj.username},(err,data)=>{
//     if(err){
//         console.log(err);
//     }

//     if(data){
//         res.redirect("/register4")
//     }else{
//         user.insertMany(obj,(err,data)=>{
//             if(err){
//                 console.log(err);
//             }
//             console.log(data);

//             if(data){
//                 res.redirect("/login4");
//             }else{
//                 res.redirect("/register4")
//             }
//         })


        
//     }
// })

module.exports = router;