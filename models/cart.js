var Cart = require('../lib/mongo').Cart;

module.exports = {
    //添加商品信息到购物车,包括当前登录人的id
    create:function create(cart){
        return Cart.create(cart).exec()
    },
    /**
     * 添加收货地址
     */
    updateAddress:function updateAddress(id,data){
        return Cart.update({_id:id},{$set:data})
            .exec()
    },
    /**通过个人id，查询购物车商品信息   isBuy:1
     * 分页显示，首次访问不知如何处理，从前端点击进入时，并没有传第几页的值，
     * 不会写默认访问页，所以只能增加代码来处理这个问题了，
     * 代码的冗余，感觉自己是在犯罪，哎！技术low
     * @param userId
     * @param pageSize    每页显示数
     * @param Count       需要跳过的数量
     * @returns {Array|{index: number, input: string}|RegExpExecArray}
     */
    findgoodsCart:function findgoodsCart(userId,pageSize,Count){
        return Cart.find({userId:userId,isBuy:1})
            .sort({_id:-1})
            .limit(pageSize)
            .skip(Count)
            .exec()
    },
    //首次访问显示
    findCart:function findCart(userId){
        return Cart.find({userId:userId,isBuy:1})
            .sort({_id:-1})
            .limit(4)
            .exec()
    },
    //传值数据总数
    cart:function cart(userId){
        return Cart.find({userId:userId,isBuy:1})
            .exec()
    },
    //查询购物车，isbuy 为2 的商品   已下订单
    findGoodsOrder:function findGoodsOrder(userId,pageSize,Count){
        return Cart.find({userId:userId,isBuy:2})
            .sort({_id:-1})
            .limit(pageSize)
            .skip(Count)
            .exec()
    },
    findOrder:function findOrder(userId){
        return Cart.find({userId:userId,isBuy:2})
            .sort({_id:-1})
            .limit(4)
            .exec()
    },
    Order:function Order(userId){
        return Cart.find({userId:userId,isBuy:2})
            .exec()
    },
    //查询购物车，isbuy 为3 的商品    已购买
    findOrdered:function findOrdered(userId){
        return Cart.find({userId:userId,isBuy:3})
            .sort({_id:-1})
            .limit(4)
            .exec()
    },
    findGoodsOrdered:function findGoodsOrdered(userId,pageSize,Count){
        return Cart.find({userId:userId,isBuy:3})
            .sort({_id:-1})
            .limit(pageSize)
            .skip(Count)
            .exec()
    },
    Ordered:function Ordered(userId){
        return Cart.find({userId:userId,isBuy:3})
            .exec()
    },
    /**
     * 更新商品数量，如果购物车有，数量加一，没有就重新插入
     * 根据userId 和goodsId 更新
     * 不需要了，前台通过判断有没有这个商品
     * 然后在执行相应的操作，
     * 实现可能会很low，现阶段如此吧

    updateGoodsCount:function updateGoodsCount(goodsId,data){
        return Cart
            .update({goodsId:goodsId},{$set:data})
            .exec()
    },*/
    /*//删除商品
    removeGoods:function removeGoods(userId,goodsId,isbuy){
        return Cart
            .remove({userId:userId,goodsId:goodsId,isBuy:parseInt(isbuy)})
            .exec();
    },*/
    //修改删除购物车的商品，  按照objectID 来删除
    removeGoods:function removeGoods(id){
        return Cart
            .remove({_id:id})
            .exec();
    },
    //通过userID，goodsID 还有size大小查询某个商品，有则数量加一，无则创建
    findSingleGoods:function findSingleGoods(userId,goodsId,isbuy,size){
        return Cart
            .findOne({userId:userId,goodsId:goodsId,isBuy:parseInt(isbuy),size:size})
            .exec()
    },
    //给相同商品添加数量
    addGoodsCount:function addGoodsCount(goodsId,isbuy,data){
        return Cart.update({goodsId:goodsId,isBuy:isbuy},{$inc:{count:data}})
            .exec()
    },
    //改写商品状态   这里的goodsId 实际是_id ,懒得改了，太多了
    updateGoodsBuy:function updateGoodsBuy(goodsId,buy){
        return Cart
            .update({_id:goodsId},{$set:buy},{multi:true})
            .exec()
    },
    //清理已完成的订单   记录留下，只是不再显示，改变isBuy的值
    removeOrderedList:function removeOrderedList(id){
        return Cart
            .update({userId:id,isBuy:3},{$set:{isBuy:4}},{multi:true})
            .exec()
    }

}