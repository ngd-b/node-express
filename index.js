var path = require('path');
var express = require('express');
var session = require('express-session');
var mongostore = require('connect-mongo')(session);
var flash = require('connect-flash');
var config = require('config-lite')(__dirname);
var routes = require('./routes');
var pkg = require('./package');

var app = express();

//设置静态目录
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');

//设置静态文件目录
app.use(express.static(path.join(__dirname,'public')));
//session 中间件
app.use(session({
        name:config.session.key,
        secret:config.session.secret,
        resave:true,       //强制更新session
        saveUninitialized:false,   //强制创建session，即使用户为登录
        cookie:{
            maxAge:config.session.maxAge
        },
        store:new mongostore({   //讲session存储到mongodb
            url:config.mongodb
        })
}));
//中间件，显示通知
app.use(flash());
// 处理表单及文件上传的中间件
app.use(require('express-formidable')({
    uploadDir: path.join(__dirname, 'public/images'),// 上传文件目录
    keepExtensions: true// 保留后缀
}));
//设置模板全局变量
app.locals.appliance = {
    title:pkg.name,
    description:pkg.description
};
//添加模板必须的三个变量
app.use(function(req,res,next){
    res.locals.message = req.session.message;
    res.locals.user = req.session.user;
    res.locals.manger = req.session.manger;
    res.locals.success=req.flash('success').toString();
    res.locals.error = req.flash('error').toString();
    next();
});

routes(app);

/*//实时交互
var socket = require('socket.io-client')('http://localhost');
socket.on('connect', function(){
    socket.emit('conn',{data:'欢迎！'});
});
socket.on('event', function(data){});
socket.on('disconnect', function(){});*/

// error page
app.use(function (err, req, res, next) {
    res.render('error', {
        error: err
    });
});

if(module.parent){
    module.exports = app;
}else{
    //监听端口
    app.listen(config.port,function(){
        console.log('${pkg.name} listening on port ${config.port}!');
    });
}

