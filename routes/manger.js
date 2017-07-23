
var sha1 = require('sha1');
var express = require('express');
var router = express.Router();

var MangerModel = require('../models/manger');

//登录页
router.get('/', function(req, res, next) {
    //添加管理员账号
    /*MangerModel.getUserByName('admin')
        .then(function(Manger) {
            if (!Manger) {
                var Man={
                    name:'admin',
                    password:'admin',
                    email:'admin@manger.com'
                };
                MangerModel.create(Man);
            }
        });*/
    res.render("mangerLogin");
});

//登录 post
router.post('/',function(req,res,next){
    var name=req.fields.name;
    var password = req.fields.password;

    MangerModel.getUserByName(name)
        .then(function(Manger){
            if(!Manger){
                req.flash('error','用户名不存在');
                return res.redirect('back');
            }
            //检查密码是否匹配
            if(password!==Manger.password){
                req.flash('error','用户名或密码错误');
                return res.redirect('back');
            }
            req.flash('success','登陆成功');
            //用户信息写入到session
            delete Manger.password;
            req.session.manger = Manger;
            //跳转到主页
            res.redirect('/operation');
        })
        .catch(next);
});

module.exports = router;