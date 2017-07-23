/**
 * Created by Administrator on 2017/5/3.
 */
/**
 * Created by Administrator on 2017/5/3.
 */
var express = require('express');
var router = express.Router();

var checkLogin = require('../middlewares/check').checkLogin;

//get 登出
router.get('/',checkLogin,function(req,res,next){
    req.session.user=null;
    req.flash('success','注销成功，欢迎下次再来！');
    //登出跳转主页面
    res.redirect('/main');
});

module.exports = router;