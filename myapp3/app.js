var createError = require("http-errors");
var express = require("express");
var cookieParser = require("cookie-parser");
var path = require("path");
var logger = require("morgan");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var session = require("express-session");
var proRouter = require("./routes/pro");
var userRouter = require("./routes/user");
var orderRouter = require("./routes/order");
var cartRouter = require("./routes/cart");
// var registerRouter = require("./routes/register");
// var register1Router = require("./routes/register1");
// var register3Router = require("./routes/register3");

var register4Router = require("./routes/register4");

// var loginRouter = require("./routes/login");
// var loginRouter1 = require("./routes/login1");

// var loginRouter3 = require('./routes/login3')

var loginRouter4 = require('./routes/login4')


var app = express();

app.use(
  session({
    //session 加密信息
    secret: "gfgfgfg",
    //强制保存 官方建议false
    resave: false,
    //初始化session 存储 true
    saveUninitialized: true,
    //设置过期时间
    // cookie: { maxAge: 1000 * 10 },
  })
);
//内部next()
app.use(cookieParser());

//cookie路由守卫
// app.all('*',(req,res,next)=>{
//   console.log('进入全局路由守卫')
//   console.log(req.cookies)
//   if(req.cookies.islogin === 'ok' || req.url === '/login' || req.rul ==='/login/in') {
//     console.log('next之前')
//     next()
//   }else {
//     console.log('守卫路由else')
//     res.redirect('/login')
//   }
// })

// session 路由守卫
app.all("*", (req, res, next) => {
  console.log("进入全局路由守卫");
  console.log(req.session);
  if (
    req.session.islogin === "ok" || req.url === "/login4" || req.url === "/login4/in"
  ) {
    console.log("next之前");
    next();
  } else {
    console.log("守卫路由else");
    res.redirect("/login4");
  }
});


// view engine setup

app.set("views", path.join(__dirname, "views"));
console.log(path.join(__dirname));
//使用模板 引擎ejs
app.set("view engine", "ejs");
// dev的时候会处理logger日志
app.use(logger("dev"));
// 使用express的json模块 可以接收和处理现在最常用方便的JSON数据 脚手架已经配好
app.use(express.json());
//xtended: false：表示使用系统模块querystring来处理，也是官方推荐的
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
//以下是路由表的use  必须先命中第一个路由表  才能进入后面的indexRouter 等 注意！

app.use("/", indexRouter);
app.use('/users', usersRouter);
app.use("/pro", proRouter);
app.use("/order", orderRouter);
app.use("/user", userRouter);
app.use("/cart", cartRouter);
// app.use("/register", registerRouter);
// app.use("/register1", register1Router);
// app.use("/register3", register3Router);

app.use("/register4", register4Router);
// app.use("/login", loginRouter);
// app.use("/login1", loginRouter1);
// app.use('/login3',loginRouter3)

app.use('/login4', loginRouter4)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
