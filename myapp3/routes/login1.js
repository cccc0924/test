var express = require("express");
var router = express.Router();
const user = require("../sql/user");

router.get("/", function (req, res, next) {
  res.render("login");
});
router.post("/in", function (req, res, next) {
  console.log("进入login1   /in里面了");
  console.log(req.body);
  user.findOne(req.body,(err,data)=>{
      if(err){
          console.log(err)
      }
      if(data) {
          res.redirect('/pro')
      }else {
          res.redirect('/register1')
      }
  })

});

module.exports = router;
