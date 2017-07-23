var config = require('config-lite')(__dirname);
var Mongolass=require('mongolass');
var mongolass = new Mongolass();

mongolass.connect(config.mongodb);

var moment = require('moment');
var objectIdToTimestamp = require('objectid-to-timestamp');

//根据id生成创建时间created_at
mongolass.plugin('addCreatedAt',{
    afterFind:function(results){
        results.forEach(function(item){
            item.created_at = moment(objectIdToTimestamp(item._id)).format('yyyy-mm-dd hh:mm');
        });
        return results;
    },
    afterFindOne:function(result){
        if(result){
            result.created_at = moment(objectIdToTimestamp(result._id)).format('yyyy-mm-dd hh:mm');
        }
        return result;
    }
});

exports.User = mongolass.model('User',{
    name:{type:'string'},
    password:{type:'string'},
    address:{type:'string'},
    tell:{type:'string'},
    email:{type:'string'},
    SecPayment:{type:'number'},
    pv:{type:'number'},
    //pv 表示已下单的，取消订单，影响信用值
    //新添属性，增加一些操作
    realname:{type:'string',default:null},
    birthday:{type:'string',default:null},
    gender:{type:'string',default:null},
    hometown:{type:'string',default:null},
    work:{type:'string',default:null},
    idcard:{type:'string',default:null}
});
exports.User.index({name:1},{unique:true}).exec();

exports.Cart = mongolass.model('Cart',{
    goodsId:{type:Mongolass.Types.ObjectId},
    gName:{type:'string'},
    describe:{type:'string'},
    size:{type:'string',enum:['x','xx','xxl']},
    count:{type:'number'},
    icons:{type:'string'},
    onePrice:{type:'number'},
    isBuy:{type:'number'},
    userId:{type:Mongolass.Types.ObjectId},
    //三种状态值，1：未下单，2：已下单，3：已购买
    //添加收货地址
    name:{type:'string'},
    address:{type:'string'},
    tell:{type:'number'},
    postcard:{type:'number'},
    remark:{type:'string'}
});
exports.Cart.index({name:1}).exec();

exports.Manger = mongolass.model('Manger',{
    name:{type:'string'},
    password:{type:'string'},
    email:{type:'string'}
});
exports.Manger.index({name:1},{unique:true}).exec();

exports.Goods = mongolass.model('Goods',{
    name:{type:'string'},
    describe:{type:'string'},
    price:{type:'number'},
    genre:{type:'string'},
    icons:{type:'string'},
    tags:{type:'string'},
    count:{type:'number'},
    pv:{type:'number'},
    isUser:{type:'string',default:0},
    isSale:{type:"string",default:1},
    userId:{type:Mongolass.Types.ObjectId}
    //pv  表示点击量，火热产品标识
});
exports.User.index({_id:1}).exec();
exports.GoodsGenre = mongolass.model('GoodsGenre',{
    name:{type:'string'},
    children:{type:'string'}
});
exports.GoodsGenre.index({_id:1}).exec();
//竞拍商品信息存储
exports.Auction = mongolass.model('Auction',{
    userName:{type:'string'},
    goodsId:{type:Mongolass.Types.ObjectId},
    bid:{type:'number'}
});
exports.Auction.index({_id:1}).exec();
