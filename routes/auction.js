
var express = require('express');
var router = express.Router();

/*var app = express();
var path = require('path');
var server = require('http').Server(app);
var io = require('socket.io')(server);

//设置静态目录
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');

app.use(express.static(path.join(__dirname,'public')));*/

var GoodsModel= require('../models/Goods');
var UserModel = require('../models/users');
var CartModel = require('../models/cart');
var AuctionModel = require('../models/Auction');

var  checkLogin = require('../middlewares/check').checkLogin;

router.get('/',checkLogin,function(req,res,next){
    Promise.all([
        GoodsModel.findMaxPVGoods(),
        AuctionModel.findMessage(),
        AuctionModel.findBid()
    ])
        .then(function(result){
            var goods = result[0];
            var message = result[1];
            var bid = result[2];

            res.render('auction',{
                goods:goods,
                message:message,
                bid:bid
            });
        })
        .catch(function(e){
            req.flash('error','出错了！');
        });

    //res.render('auction');
})

router.get('/addmessage',function(req,res,next){
    var username = req.query.name;
    var goodsId = req.query.id;
    var bid = parseFloat(req.query.bid);

    var auction={
        userName:username,
        goodsId:goodsId,
        bid:bid
    };
    /*AuctionModel.removeMessage(goodsId)
        .then(function(){

        })*/

    if(bid>=3000){
        GoodsModel.findSingleById(goodsId)
            .then(function(goods){
                if(!goods){
                    req.flash('error','商品已下架，请联系商家！');
                }
                UserModel.getUserByName(username)
                    .then(function(user){
                        if(!user){
                            res.send({
                                data:'用户不存在！'
                            });
                        }

                        var userId = user._id;
                        var cart = {
                            goodsId: goods._id,
                            gName: goods.name,
                            describe: goods.describe,
                            size:'xx',
                            count: 1,
                            onePrice: bid,
                            isBuy: 2,
                            userId: userId
                        };
                        CartModel.create(cart)
                            .then(function(){
                                req.flash('success','已加入购物车！');
                                res.send({
                                    data:'恭喜'+username+'获得该物品！'
                                });
                            })
                            .catch(function(e){
                                res.send({
                                    'data': e.message
                                });
                            });
                    });
                AuctionModel.removeMessage(goodsId)
                    .then(function(){

                    }).catch(function(e){
                        res.send({
                            data: e.message
                        });
                    })
            })

            .catch(function(e){
                res.send({
                    'data': e.message
                });
            });
    }else{
        AuctionModel.addMessage(auction)
            .then(function(result){
                if(!result){
                    req.flash('error','出错了！');
                }
                res.send({
                    data:'加价成功！'
                });
            })
            .catch(function(e){

            })
    }
});
module.exports=router;
/**
 * 重启服务端口，websocket
 *
 */

/*server.listen(4440,'127.0.0.1',function(){
    console.log('websocket');
});

io.on('connection',function(socket){
    socket.emit('news',{hello:'world'});
    socket.on('event',function(data){
        console.log(data.my);
    });
});*/



//


