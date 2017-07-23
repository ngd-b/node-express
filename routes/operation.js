/**
 * Created by Administrator on 2017/5/3.
 */
var fs = require("fs");
var path = require("path");
var express= require('express');
var router = express.Router();

var UserModel = require('../models/users');
var GoodsModel = require('../models/Goods');
var GoodsGenre = require('../models/GoodsGenre');
var checkMangerLogin = require('../middlewares/check').checkMangerLogin;

//管理中心
router.get('/',checkMangerLogin,function(req,res,next){
    res.render('operation');
});
//管理员资料查看/
//用户信息查看 get
router.get('/userInfo',checkMangerLogin,function(req,res,next) {
    UserModel.findAll()
        .then(function (UserAll) {
            if (!UserAll) {
                req.flash('error', '系统出问题了');
            }
            res.render('userInfo', {
                UserAll: UserAll
            });
        })
        .catch(next);
});
//用户信息删除操作
router.get('/:UserId/remove',function(req,res,next){
    var userId = req.params.UserId;

    UserModel.DeleteUserById(userId)
        .then(function(){
            req.flash('success','用户信息删除成功');

            res.redirect('back');
        })
        .catch(next);
});
router.post('/edit',function(req,res,next){
    res.send(req.flash());
});

//商品信息管理
router.get('/goodsInfo',checkMangerLogin,function(req,res,next){
    GoodsModel.findAll()
        .then(function(GoodAll){
            if(!GoodAll){
                req.flash('error','出错了');
            }
            res.render('goodsManger',{
                goods:GoodAll
            });
        })
        .catch(next);
});
//商品信息添加
router.post('/goodsInfo/add',function(req,res,next){
    var name = req.fields.name;
    var describe = req.fields.describe;
    var price = parseFloat(req.fields.price);
    var genre = req.fields.genre;
    var icons=req.files.icons.path.split(path.sep).pop();
    /*var icon =req.fields.icons.split(';');
    for(var i=0;i<icon.length;i++){
        icons.push(icon[i]);
    }*/
    console.log("图片地址："+icons);
    var tags =req.fields.tags;
    var count=parseInt(req.fields.count);
    /*var tag = req.fields.tags.split(',');
    for(var j=0;j<tag.length;j++){
        tags.push(tag[i]);
    }*/
    try{
        if(name.length<2){
            throw new Error('请填写商品名称');
        }
        if(describe.length<2){
            throw new Error('请填写商品描述');
        }
        if(isNaN(price)){
            throw new Error('请填写商品价格，类型为数字');
        }
        if(genre.length<2){
            throw new Error('请填写商品类型');
        }
        if(!req.files.icons.name){
            throw new Error('请填写商品图片路径');
        }
        if(tags.length<2){
            throw new Error('请填写商品标签');
        }
        if(count<1){
            throw new Error("商品数量不足以出售！");
        }

    }catch(e){
        fs.unlink(req.files.icons.path);
        req.flash('error', e.message);
        res.redirect('back');
    }
    var goods = {
        name:name,
        describe:describe,
        price:price,
        genre:genre,
        icons:"images/"+icons,
        tags:tags,
        count:count,
        pv:0
        };
    GoodsModel.create(goods)
        .then(function(){
            req.flash('success','添加成功！');
            res.redirect('back');
        })
        .catch(function(e){
            fs.unlink(req.files.icons);
            req.flash('error', e.message);
            res.redirect('back');
            next(e);
        });
});
//商品信息修改
router.post('/goodsInfo/edit/:goodsId',function(req,res,next){
    var goodsId = req.params.goodsId;
    var name = req.fields.name;
    var describe = req.fields.describe;
    var price = parseFloat(req.fields.price);
    var genre = req.fields.genre;
    //var icons=req.fields.icons;

    var tags =req.fields.tags;
    var count = parseInt(req.fields.count);
    var pv = parseInt(req.fields.pv);

    GoodsModel.UpdateGoodsById(goodsId,{
        name:name,
        describe:describe,
        price:price,
        genre:genre,
       // icons:icons,
        tags:tags,
        count:count,
        pv:pv
    })
        .then(function(){
            req.flash('success','商品修改成功！');
            res.redirect('/operation/goodsInfo');
        })
        .catch(function(e){
            req.flash('error', e.message);
            res.redirect('/operation/goodsInfo');
        });

});
//商品删除
router.get('/:goodsId/goodsremove',function(req,res,next){
    var goodsName = req.params.goodsId;

    GoodsModel.DeleteGoodsById(goodsName)
        .then(function(goods){
            //fs.unlink(goods.icons);
            req.flash('success','商品信息删除成功！');
            res.redirect('back');
        })
        .catch(function(d){
            req.flash('error', d.message);
        });
});
//留言信息处理
/**
 * 留言功能待定，改为添加类别，方便查询
 */
router.post('/genre/add',function(req,res,next){
    var genre = req.fields.name;
    var child = req.fields.child;
    try{
        if(genre<4){
            throw new Error('请输入类型');
        }
        if(child<6){
            throw new Error('请输入子分类！');
        }
    }catch(e){
        req.flash('error', e.message);
    }

    var Genre= {
        name:genre,
        children:child
    }
    GoodsGenre.create(Genre)
        .then(function(){
            req.flash('success','添加成功！');
            res.redirect('back');
        })
        .catch(function(e){
            req.flash('error', e.message);
        })
});
//类别修改
router.post('/genre/edit/:genreId',function(req,res,next){
    var genreId = req.params.genreId;
    var genre = req.fields.genre;
    var child = req.fields.child;

    GoodsGenre.updateGenre({
        name:genre,
        children:child
    })
        .then(function(){
            res.redirect('back');
        })

})
//类别删除
router.get('/:genreId/genreremove',function(req,res,next){
    var genreId = req.params.genreId;
    GoodsGenre.deleteGenre(genreId)
        .then(function(){
            res.redirect('back');
        })
});
//查询管理
router.get('/messageInfo',function(req,res,next){
    GoodsGenre.findGenre()
        .then(function(genre){
            if(!genre){
                req.flash('error','出错了');
            }
            res.render('message',{
                genre:genre
            });
        })
});

module.exports = router;