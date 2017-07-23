var express = require('express');
var router = express.Router();
//var app = express();

var GoodsModel = require('../models/Goods');
var CartModel = require('../models/cart');
/**
 * 这一块有个问题，购买或者加入的时候，数量为1时，会加到二
 * 其他数量正常
 */
//处理点击购买后的部分
router.get('/buy',function(req,res,next){
    var goodsId = req.query.goodsId;
    var size = req.query.size;
    var count = parseInt(req.query.count);

    var user = req.session.user;
    GoodsModel.findSingleById(goodsId)
        .then(function(goods){
            if(!goods){
                req.flash('error','商品已下架，请联系商家！');
            }
            if(user == null){
                res.send({
                    'data':'请登录！'
                });
                //req.flash('error','用户未登录！');
            }
            var userId = user._id;
            CartModel.findSingleGoods(userId,goodsId,2,size)
                .then(function(result){
                    if(!result){
                        var cart = {
                            goodsId: goods._id,
                            gName: goods.name,
                            describe: goods.describe,
                            size: size,
                            count: count,
                            icons:goods.icons,
                            onePrice: goods.price,
                            isBuy: 2,
                            userId:userId
                        }
                        CartModel.create(cart)
                            .then(function(){
                                req.flash('success','已加入购物车！');
                                res.send({
                                    'data':'下单成功！'
                                });
                            })
                            .catch(function(e){
                                res.send({
                                    'data': e.message
                                });
                            });
                    }else{
                        CartModel.addGoodsCount(goodsId,2,count)
                            .then(function(){
                                res.send({
                                    'data':'数量增加了'
                                });
                            }).catch(function(e){
                                res.send({
                                    'data': e.message
                                });
                            });
                    }
                });
            //res.redirect('/per-order');
        })
        .catch(function(e){
            res.send({
                'data': e.message
            });
        });
});
//点击加入到购物车
router.get('/addCart',function(req,res,next){
    var goodsId = req.query.goodsId;
    var size = req.query.size;
    var count = parseInt(req.query.count);

    var user = req.session.user;
    GoodsModel.findSingleById(goodsId)
        .then(function(goods){
            if(!goods){
                req.flash('error','商品已下架，请联系商家！');
            }
            if(user == null){
                res.send({
                    'data':'请登录！'
                });
                //req.flash('error','用户未登录！');
            }
            var userId = user._id;
            CartModel.findSingleGoods(userId,goodsId,1,size)
                .then(function(result){
                    if(!result){
                        var cart = {
                            goodsId: goods._id,
                            gName: goods.name,
                            describe: goods.describe,
                            size: size,
                            count: count,
                            icons:goods.icons,
                            onePrice: goods.price,
                            isBuy: 1,
                            userId:userId
                        }
                        CartModel.create(cart)
                            .then(function(){
                                req.flash('success','已加入购物车！');
                                res.send({
                                    'data':'已加入购物车！'
                                });
                            })
                    }else{
                        CartModel.addGoodsCount(goodsId,1,count)
                            .then(function(){
                                res.send({
                                    'data':'数量增加了'
                                });
                            }).catch(function(e){
                                res.send({
                                    'data': e.message
                                });
                            });
                    }
                });
        })
        .catch(function(e){
            res.send({
                'data': e.message
            });
        });
});
//商品删除管理    购物车、订单
router.get('/:goodsId/:isbuy/remove',function(req,res,next){
    var goodsId = req.params.goodsId;
    var isBuy = parseInt(req.params.isbuy);
    var userId = req.session.user._id;
    CartModel.removeGoods(goodsId)
        .then(function(){
            req.flash('success','删除成功！');
            res.redirect('back');
        })
        .catch(function(e){
            req.flash('error','出错了！');
        });
});


//测试ajax返回数据处理,
/*
* 出现的问题：
* 1，req,res 参数的顺序，放错，导致报错，res.render 不是一个函数
* 2，传过来的值，获取，req.query.     使用了req.body.
* */
/*router.get('/buy',function(req,res){
    var size = req.query.size;
    var count = parseInt(req.query.count);
    res.send({
        'data': 'hello',
        'size':size,
        'count':count
    });
    console.log('hello');
});*/
//转向单个商品详情页
//已放到主页中处理，main
/*router.get('/:goodsId',function(req,res,next){
    var goodsId = req.params.goodsId;

    GoodsModel.findSingleById(goodsId)
        .then(function(goods){
            if(!goods){
                req.flash('error','单个商品查询出错了！');
            }
            req.flash('success','单个商品查询成功了！');
            res.render('singleGoods',{
                goods:goods
            });
        })
        .catch(next);
});*/
module.exports = router;