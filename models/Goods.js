var Goods = require('../lib/mongo').Goods;

module.exports = {
    //添加一个商品 用户添加包括userId,状态，
    create:function create(goods){
        return Goods.create(goods).exec();
    },

    //查询管理员添加的所有商品信息
    findAll:function findAll(){
        return Goods
            .find({isUser:{$ne:1}})
            .addCreatedAt()
            .exec();
    },
    //查询用户自己置买的所有商品信息
    findAllUser:function findAllUser(userID){
        return Goods
            .find({userId:userID})
            .addCreatedAt()
            .exec();
    },
    //查询单个商品信息  /虽然id 是独一无二的，但是查询一个商品的信息，还是得findOne
    findSingleById:function findSingleById(goodsId){
        return Goods
            .findOne({_id:goodsId})
            .addCreatedAt()
            .exec()
    },
    //查完单个商品，就是的给他访问量加一了
    incPv:function incPv(goodsId){
        return Goods
            .update({_id:goodsId},{$inc:{pv:1}})
            .exec()
    },
    //通过类型查取，获取商品信息
    getGoodsByGenre:function getGoodsByGenre(genre){
        return Goods
            .find({genre:{$regex:genre}})
            .addCreatedAt()
            .exec();
    },
    //更新商品信息
    UpdateGoodsById:function UpdateGoodsById(goodsId,data){
        return Goods.update({_id:goodsId},{$set:data})
            .exec();
    },
    //更新商品信息
    UpdateCountById:function UpdateCountById(goodsId,count){
        return Goods.update({_id:goodsId},{$set:{count:-count}})
            .exec();
    },
    //删除商品信息,
    DeleteGoodsById:function DeleteGoodsById(goodsId){
        return Goods.remove({_id:goodsId})
            .exec()
    },
    //通过pv访问量降序查找商品 /热销商品
    SelectGoodsByPv:function SelectGoodsByPv(){
        return Goods
            .find()
            .sort({pv:-1})
            .limit(4)
            .addCreatedAt()
            .exec()
    },
    /**
     * 这块优化，当点击更多的时候，需查出所有的商品
     *
     */
    SelectAllGoodsByPv:function SelectAllGoodsByPv(){
        return Goods
            .find()
            .sort({pv:-1})
            .addCreatedAt()
            .exec()
    },

    //通过_id按时间降序查找商品 /最新商品
    SelectGoodsById:function SelectGoodsById(){
        return Goods
            .find()
            .sort({_id:-1})
            .limit(4)
            .addCreatedAt()
            .exec()
    },
    SelectAllGoodsById:function SelectAllGoodsById(){
        return Goods
            .find()
            .sort({_id:-1})
            .addCreatedAt()
            .exec()
    },
    //通过标签查取，获取商品信息
    getGoodsByTags:function getGoodsByTags(tag){
        return Goods
            .find({tags:{$regex:tag}})
            .addCreatedAt()
            .exec();
    },
    findMaxPVGoods:function findMaxPVGoods(){
        return Goods
            .find()
            .sort({pv:-1})
            .limit(1)
            .exec();
    }

}