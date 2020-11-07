const db = require("./db");

// 帮我们锁死数据格式  参考英雄联盟里面只有六神装没有七神装 
const adminSchema = new db.mongoose.Schema({
    "username":{type:String},
    "password":{type:String},
   
})
// 我们的数据库锁死名字叫users   
module.exports = db.mongoose.model("users", adminSchema);
