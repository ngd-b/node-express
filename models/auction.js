var Auction = require('../lib/mongo').Auction;

module.exports = {
    addMessage:function addMessage(auction){
        return Auction.create(auction).exec()
    },
    removeMessage:function removeMessage(goodsId){
        return Auction.remove({goodsId:goodsId}).exec()
    },
    //时间降序
    findMessage:function findMessage(){
        return Auction
            .find()
            .sort({_id:-1})
            .exec()
    },
    //价格降序
    findBid:function findBid(){
        return Auction
            .find()
            .sort({bid:-1})
            .limit(1)
            .exec()
    }
}