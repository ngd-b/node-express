var Auction = require('../lib/mongo').Auction;

module.exports = {
    addMessage:function addMessage(auction){
        return Auction.create(auction).exec()
    },
    removeMessage:function removeMessage(goodsId){
        return Auction.remove({goodsId:goodsId}).exec()
    },
    //ʱ�併��
    findMessage:function findMessage(){
        return Auction
            .find()
            .sort({_id:-1})
            .exec()
    },
    //�۸���
    findBid:function findBid(){
        return Auction
            .find()
            .sort({bid:-1})
            .limit(1)
            .exec()
    }
}