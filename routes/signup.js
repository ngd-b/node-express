var fs = require('fs');
var path = require('path');
var sha1 = require('sha1');
var express = require('express');
var router = express.Router();

var UserModel = require('../models/users');
var checkNotLogin = require('../middlewares/check').checkNotLogin;
//注册页
router.get('/',function(req, res, next) {
    res.render("signup");
});
//post 注册
router.post('/',checkNotLogin,function(req,res,next){
    var name = req.fields.name;
    var password1 =req.fields.password1;
    var password2 = req.fields.password2;
    var address = req.fields.address;
    var tell = req.fields.tell;
    var email = req.fields.email;

   // var emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    //参数校验
    try{
        if(!(name.length>=1&&name.length<=10)){
            throw new Error('名字请限制在1-10个字符');
        }
        if(password1.length<6){
            throw new Error('密码至少6个字符');
        }
        if(password1!==password2){
            throw new Error('两次输入密码不一样');
        }
        if(address.length<6){
            throw new Error('请填写详细地址信息');
        }
        if(tell.length!=11){
            throw new Error('请正确填写电话号码');
        }

    }catch(e){
        //一部删除上传的头像
        //fs.unlink(req.files.avator.path);
        req.flash('error', e.message);
        return res.redirect('/signup');
    }

    password = sha1(password1);

    //待写入的用户数据信息
    var user = {
        name:name,
        password:password,
        address:address,
        tell:tell,
        email:email,
        SecPayment:0,
        pv:0
    };
    //写入数据库
    UserModel.create(user)
        .then(function(result){
            //注册后回调函数
            user = result.ops[0];     //包含_id
            delete user.password;
            req.session.user = user;   //用户信息写入session
            req.flash('success','注册成功');
            res.redirect('/main');       //跳转首页
        })
        .catch(function(e){
            //失败,异步删除上传头像
            //fs.unlink(req.files.avator.path);
            //用户名被占用，调回注册页，
            if(e.message.match('E11000 duplicate key')){
                req.flash('error','用户名被占用');
                return res.redirect('/signup');
            }
            next(e);
        });
});

module.exports = router;