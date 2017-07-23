/**
 * Created by Administrator on 2017/5/3.
 */
var express = require('express');
var router = express.Router();

var GoodsModel = require('../models/Goods');
var GoodsGenre = require('../models/GoodsGenre');
//声像商品信息
router.get('/sounds',function(req,res,next){

    Promise.all([
        GoodsModel.getGoodsByGenre('声像'),
        GoodsGenre.findGenreByName('声像')
    ])
        .then(function(result){
            var goods = result[0];
            var genre = result[1];
            if(!goods){
                req.flash('error','出错了！');
            }
            if(!genre){
                req.flash('error','没有此类别');
            }
            res.render('goodsInfo',{
                goods:goods,
                genre:genre
            });
        })
        .catch(function(e){
            req.flash('error', e.message);
        });
});
//厨房商品信息
router.get('/kitchen',function(req,res,next){
    Promise.all([
        GoodsModel.getGoodsByGenre('厨房'),
        GoodsGenre.findGenreByName('厨房')
    ])
        .then(function(result){
            var goods = result[0];
            var genre = result[1];
            if(!goods){
                req.flash('error','出错了！');
            }
            if(!genre){
                req.flash('error','没有此类别');
            }
            res.render('goodsInfo',{
                goods:goods,
                genre:genre
            });
        })
        .catch(function(e){
            req.flash('error', e.message);
        });
});
//空调器商品信息
router.get('/airCond',function(req,res,next){
    Promise.all([
        GoodsModel.getGoodsByGenre('空调'),
        GoodsGenre.findGenreByName('空调')
    ])
        .then(function(result){
            var goods = result[0];
            var genre = result[1];
            if(!goods){
                req.flash('error','出错了！');
            }
            if(!genre){
                req.flash('error','没有此类别');
            }
            res.render('goodsInfo',{
                goods:goods,
                genre:genre
            });
        })
        .catch(function(e){
            req.flash('error', e.message);
        });
});
//保健电器商品信息
router.get('/healthCare',function(req,res,next){
    Promise.all([
        GoodsModel.getGoodsByGenre('保健'),
        GoodsGenre.findGenreByName('保健')
    ])
        .then(function(result){
            var goods = result[0];
            var genre = result[1];
            if(!goods){
                req.flash('error','出错了！');
            }
            if(!genre){
                req.flash('error','没有此类别');
            }
            res.render('goodsInfo',{
                goods:goods,
                genre:genre
            });
        })
        .catch(function(e){
            req.flash('error', e.message);
        });
});
//电暖起商品信息
router.get('/electheater',function(req,res,next){
    Promise.all([
        GoodsModel.getGoodsByGenre('电暖'),
        GoodsGenre.findGenreByName('电暖')
    ])
        .then(function(result){
            var goods = result[0];
            var genre = result[1];
            if(!goods){
                req.flash('error','出错了！');
            }
            if(!genre){
                req.flash('error','没有此类别');
            }
            res.render('goodsInfo',{
                goods:goods,
                genre:genre
            });
        })
        .catch(function(e){
            req.flash('error', e.message);
        });
});
//清洁用具商品信息
router.get('/cleaning',function(req,res,next){
    Promise.all([
        GoodsModel.getGoodsByGenre('清洁'),
        GoodsGenre.findGenreByName('清洁')
    ])
        .then(function(result){
            var goods = result[0];
            var genre = result[1];
            if(!goods){
                req.flash('error','出错了！');
            }
            if(!genre){
                req.flash('error','没有此类别');
            }
            res.render('goodsInfo',{
                goods:goods,
                genre:genre
            });
        })
        .catch(function(e){
            req.flash('error', e.message);
        });
});
module.exports = router;