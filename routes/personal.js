/**
 * Created by Administrator on 2017/5/3.
 */
var fs= require("fs");
var path = require("path");
var sha1 = require('sha1');
var express= require('express');
var router = express.Router();

var CartModel = require('../models/cart')
var UserModel = require('../models/users');
var GoodsModel = require('../models/Goods');
var checkLogin = require('../middlewares/check').checkLogin;

//用户中心
router.get('/',checkLogin,function(req,res,next){
    res.render('personal');
});
//用户资料资料查看/post 修改
router.get('/info',function(req,res,next){
    UserModel.getUserByName(req.session.user.name)
        .then(function(user){
            if(!user){
                req.flash('error','查询出错了，请联系管理员！-_-');
            }
            req.session.user=user;
            res.render('per-info');
        })
        .catch(next);
});
//修改后信息提交
router.post('/info',function(req,res,next){
    var name = req.session.user.name;
    //var password =req.fields.password;
    var address = req.fields.address;
    var tell = req.fields.tell;
    var email = req.fields.email;

    UserModel.UpdateUserByName(name,{
        //password:password,
        address:address,
        tell:tell,
        email:email
    })
        .then(function(){
            req.session.message="success";
            req.flash("success","修改成功！");
            res.redirect('/personal/info');
        })
        .catch(function(){
            req.session.message="fail";
        });
});
//密码修改
router.post('/alertpass',function(req,res,next){
    var newpass = req.fields.newpass1;
    var oldpass1= req.fields.oldpass;
    var name = req.session.user.name;
    var oldpass = req.session.user.password;

    oldpass1 = sha1(oldpass1);
    var pass= sha1(newpass);
    if(oldpass==oldpass1){
        UserModel.UpdatePassword(name,pass)
            .then(function(){
                req.session.message="success";
                req.flash("success","修改成功！");
                res.redirect('back');
            })
            .catch(function(e){
                req.session.message="fail";
                req.flash("error","修改失败！");
            })
    }else{
        req.flash("error","原密码错误！");
        res.redirect('back');
    }


});

//个人信息添加
router.post('/detailinfo',function(req,res,next){
    var realname = req.fields.realname;
    var birthday = req.fields.birthday;
    var gender = req.fields.gender;
    var hometown = req.fields.hometown;
    var idcard = req.fields.idcard;
    var work = req.fields.work;

    var data = {
        realname:realname,
        birthday:birthday,
        gender:gender,
        hometown:hometown,
        idcard:idcard,
        work:work
    };

    UserModel.addInfo(req.session.user.name,data)
        .then(function(){
            req.session.message="success";
            req.flash("success","添加成功！");
            res.redirect('back');
        })
        .catch(function(){
            req.session.message="fail";
            req.flash("error","添加失败！");
            res.redirect('back');
        })

});
//个人保障金查询 get /post 充值修改
router.get('/ensure',function(req,res,next){
    UserModel.getUserByName(req.session.user.name)
        .then(function(user){
            if(!user){
                req.flash('error','查询出错了，请联系管理员！-_-');
            }
            //req.session.user.credit = parseInt(user.SecPayment);
            req.session.user=user;
            res.render('per-ensure');
        })
        .catch(next);
});
//保障金充值修改
router.post('/ensure',function(req,res,next){
    var money = parseFloat(parseFloat(req.fields.money)+req.session.user.SecPayment);
    var name = req.session.user.name;
    //var credit = req.session.user.credit;

    UserModel.UpdateUserByName(name,{
        SecPayment:money,
        credit:'100'
    })
        .then(function(){
            req.flash('success','修改成功！');
            res.redirect('back');
        })
        .catch(next);
});
//订单查看  isbuy:2
router.get('/order',function(req,res,next){
    var pagesSize = 4;
    Promise.all([
        CartModel.findOrder(req.session.user._id),
        CartModel.Order(req.session.user._id)
    ])
        .then(function(result){
            if(!result){
                req.flash('error','出错了！');
            }
            var goods = result[0];
            var page = Math.ceil(result[1].length/4)
            req.flash('success','查找成功！');
            //req.session.user.credit = parseInt(user.SecPayment);
            res.render('per-order',{
                goods:goods,
                page:page
            });
        })
        .catch(next);
});
//分页 order
router.get('/order/page',function(req,res,next){
    var pageSize=4;
    var pageNum = (parseInt(req.query.count)-1)*4;
    Promise.all([
        CartModel.findGoodsOrder(req.session.user._id,pageSize,pageNum),
        CartModel.Order(req.session.user._id)
    ])
        .then(function(result){
            if(!result){
                req.flash('error','出错了！');
            }
            req.flash('success','查找成功！');
            var goods = result[0];
            var page = Math.ceil(result[1].length/4);
            res.send({
                'goods':goods,
                'data':page
            });
            //req.session.user.credit = parseInt(user.SecPayment);
            /*res.render('per-order',{
                goods:goods,
                page:page
            });*/
        })
        .catch(function(e){
            res.send({
                'data': e.message
            });
        });
});

//已买查看   sibuy:3
router.get('/ordered',function(req,res,next){
    var pagesSize = 4;
    Promise.all([
        CartModel.findOrdered(req.session.user._id),
        CartModel.Ordered(req.session.user._id)
    ])
        .then(function(result){
            if(!result){
                req.flash('error','出错了！');
            }
            var goods = result[0];
            var page = Math.ceil(result[1].length/4)
            req.flash('success','查找成功！');
            //req.session.user.credit = parseInt(user.SecPayment);
            res.render('per-ordered',{
                goods:goods,
                page:page
            });
        })
        .catch(next);
});
//分页 ordered
router.get('/ordered/page',function(req,res,next){
    var pageSize=4;
    var page = (parseInt(req.query.count)-1)*4;
    Promise.all([
        CartModel.findGoodsOrdered(req.session.user._id,pageSize,page),
        CartModel.Ordered(req.session.user._id)
    ])
        .then(function(result){
            if(!result){
                req.flash('error','出错了！');
            }
            req.flash('success','查找成功！');
            var goods = result[0];
            var page = Math.ceil(result[1].length/4);
            res.send({
                'goods':goods,
                'data':page
            });
            //req.session.user.credit = parseInt(user.SecPayment);
            /*res.render('per-order',{
             goods:goods,
             page:page
             });*/
        })
        .catch(function(e){
            res.send({
                'data': e.message
            });
        });
});
//购物车查看   sibuy:1
router.get('/cart',function(req,res,next){
    var pagesSize = 4;
    Promise.all([
        CartModel.findCart(req.session.user._id),
        CartModel.cart(req.session.user._id)
    ])
        .then(function(result){
            if(!result){
                req.flash('error','出错了！');
            }
            var goods = result[0];
            var page = Math.ceil(result[1].length/4);
            req.flash('success','查找成功！');
            //req.session.user.credit = parseInt(user.SecPayment);
            res.render('per-cart',{
                goods:goods,
                page:page
            });
        })
        .catch(next);
});
//分页 cart
router.get('/cart/page',function(req,res,next){
    var pageSize=4;
    var page = (parseInt(req.query.count)-1)*4;
    Promise.all([
        CartModel.findgoodsCart(req.session.user._id,pageSize,page),
        CartModel.cart(req.session.user._id)
    ])
        .then(function(result){
            if(!result){
                req.flash('error','出错了！');
            }
            req.flash('success','查找成功！');
            var goods = result[0];
            var page = Math.ceil(result[1].length/4);
            res.send({
                'goods':goods,
                'data':page
            });
            //req.session.user.credit = parseInt(user.SecPayment);
            /*res.render('per-order',{
             goods:goods,
             page:page
             });*/
        })
        .catch(function(e){
            res.send({
                'data': e.message
            });
        });
});
//购买处理
router.get('/buy/order',function(req,res,next){
    var goodsId = req.query.goodsId;
    var total = parseFloat(req.query.total);
    var name = req.session.user.name;
    var secPayment = parseFloat(req.session.user.SecPayment);
    var nowMoney = secPayment - total;
    if(nowMoney<0){
        res.send({
            'stat':'fail',
            'data':'你的余额不足，请充值！'
        });
    }else{
        UserModel.UpdateUserByName(name,{
            SecPayment:nowMoney
        })
            .then(function(){
                for(var i=0;i<goodsId.length;i++){
                    CartModel.updateGoodsBuy(goodsId[i],{
                        isBuy:3
                    })
                        .then(function(){
                        })
                        .catch(function(e){
                            res.send({
                                'data': e.message
                            });
                        })
                }
                res.send({
                    'stat':"success",
                    'data':'购买成功！'
                });
            })
            .catch(function(e){
                res.send({
                    'data': e.message
                });
            });
    }
});
//加入订单处理
router.get('/buy/cart',function(req,res,next){
    var goodsId = req.query.goodsId;

    for(var i=0;i<goodsId.length;i++){
        //console.log(goodsId[i]);
        //console.log('f分隔符');
        CartModel.updateGoodsBuy(goodsId[i],{
            isBuy:2
        })
            .then(function(){
                res.send({
                    'stat':'success',
                    'data':'提交成功！去支付吧'
                });
            })
            .catch(function(e){
                res.send({
                    'stat':"fail",
                    'data': e.message
                });
            })
    }


});
//个人闲置物品出售
router.get("/sale",function(req,res,next){

    var userid= req.session.user._id;
    GoodsModel.findAllUser(userid)
        .then(function(result){
            res.render("per-sale",{
                goods:result
            });
        })
        .catch(function(e){

        })
    //res.render("per-sale");
});
//发布物品
router.post('/sale/add',function(req,res,next){
    var name = req.fields.name;
    var describe =req.fields.describe;
    var price = req.fields.price;
    var genre = req.fields.genre;
    var tags = req.fields.tags;
    var count = req.fields.count;
    var icons = req.files.icons.path.split(path.sep).pop();

    var userId = req.session.user._id;
    var good={
        name:name,
        describe:describe,
        price:price,
        genre:genre,
        tags:tags,
        count:count,
        icons:icons,
        userId:userId,
        isUser:1,
        isSale:1
    };
    GoodsModel.create(good)
        .then(function(){
            req.flash("success","成功！");
            res.render("per-sale",{
                goods:good
            });
        })
        .catch(function(e){
            req.flash("error","失败！");
            res.render("error");
        })

});
//收货地址的填写
router.post("/address",function(req,res,next){
    var name = req.fields.name;
    var address = req.fields.address;
    var tell  =req.fields.tell;
    var postcard  =req.fields.postcard;
    var remark = req.fields.remark;

res.render('address');
});
//清理已买订单
router.get('/removeOrdered',function(req,res,next){
    var id = req.session.user._id;
    CartModel.removeOrderedList(id)
        .then(function(){
            res.send({
                'stat':'success'
            })
        })
        .catch(function(){
            res.send({
                'stat':'fail'
            });
        })
});
module.exports = router;