
var sha1 = require('sha1');
var express = require('express');
var router = express.Router();

var GoodsModel = require('../models/Goods');
var UserModel = require('../models/users');
var checkNotLogin = require('../middlewares/check').checkNotLogin;
//主页
//包括获取最新的商品信息，按照pv访问量获取热销商品
router.get('/', function(req, res, next) {
    Promise.all([
        GoodsModel.SelectGoodsByPv(),
        GoodsModel.SelectGoodsById()
    ])
        .then(function(result){
            var hotgoods = result[0];
            var newgoods = result[1];
            if(!hotgoods){
                throw new Error('没有热销商品');
            }
            if(!newgoods){
                throw new Error('没有最新商品');
            }
            res.render('main',{
                hotgoods:hotgoods,
                newgoods:newgoods
            });
        });

    //使用这种产生的问题，页面有时会刷新不出来
    // ，估计是两个方法调用不同步造成的，
    /*var HotGoods;
    var NewGoods;
    GoodsModel.SelectGoodsByPv()
        .then(function(result1){
            if(!result1){
                req.flash('error','热销商品查询出错了！');
            }
            req.flash('success','热销商品查询成功了！');
            HotGoods = result1;
        }).catch(next);
    GoodsModel.SelectGoodsById()
        .then(function(result2){
            if(!result2){
                req.flash('error','最新商品查询出错了！');
            }
            req.flash('success','最新商品查询成功le!');
            NewGoods = result2;
            res.render("main",{
                hotgoods:HotGoods,
                newgoods:NewGoods
            });
        }).catch(next);*/
});

//登录 post
router.post('/',checkNotLogin,function(req,res,next){
    var name=req.fields.name;
    var password = req.fields.password;

    UserModel.getUserByName(name)
        .then(function(user){
            if(!user){
                req.flash('error','用户不存在');
                res.redirect('/main');
            }
            //检查密码是否匹配
            if(sha1(password)!==user.password){
                req.flash('error','用户名或密码错误');
                res.redirect('/main');
            }
            req.flash('success','登陆成功');
            //用户信息写入到session
            delete user.password;
            req.session.user = user;
            //跳转到主页
            res.redirect('/main');
        })
        .catch(next);
});

//单个商品详情页
router.get('/:goodsId/single',function(req,res,next){
    var goodsId = req.params.goodsId;

    Promise.all([
        GoodsModel.findSingleById(goodsId),
        GoodsModel.incPv(goodsId)
    ])
        .then(function(result){
            var goods = result[0];
            if(!goods){
                req.flash('error','单个商品查询出错了！');
            }
            req.flash('success','单个商品查询成功了！');
            res.render('singleGoods',{
                goods:goods
            });
        })
    //增加访问量，学习了promise
    /*GoodsModel.findSingleById(goodsId)
        .then(function(goods){
            if(!goods){
                req.flash('error','单个商品查询出错了！');
            }
            req.flash('success','单个商品查询成功了！');
            res.render('singleGoods',{
                goods:goods
            });
        })
        .catch(next);*/
});
//处理最新，最热商品
router.get('/hot',function(req,res,next){
    GoodsModel.SelectAllGoodsByPv()
        .then(function(goods){
            res.render('newhot',{
                newhot:'最热商品',
                goods:goods
            });
        })
        .catch(next)
});
router.get('/new',function(req,res,next){
    GoodsModel.SelectAllGoodsById()
        .then(function(goods){
            res.render('newhot',{
                newhot:'最新商品',
                goods:goods
            });
        })
        .catch(next)
});

//查询功能
router.post('/search',function(req,res,next){
    var search = req.fields.search;

    GoodsModel.getGoodsByTags(search)
        .then(function(goods){
            res.render('newhot',{
                newhot:'查询结果',
                goods:goods
            });
        })
        .catch(next)
});
module.exports = router;