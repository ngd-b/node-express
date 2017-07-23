var User = require('../lib/mongo').User;

module.exports = {
    //注册一个用户
    create:function create(user){
        return User.create(user).exec();
    },
    //用户信息添加
    addInfo:function addInfo(name,data){
        return User.update({name:name},{$set:data})
    },
    //查询所有用户信息
    findAll:function findAll(){
        return User
            .find()
            .addCreatedAt()
            .exec();
    },
    //通过用户名获取用户信息
    getUserByName:function getUserByName(name){
        return User
            .findOne({name:name})
            .addCreatedAt()
            .exec();
    },
    //密码修改
    UpdatePassword:function UpdatePassword(name,newpass){
        return User.update({name:name},{$set:{password:newpass}});
    },
    //更新用户信息
    UpdateUserByName:function UpdateUserByName(name,data){
        return User.update({name:name},{$set:data})
            .exec();
    },
    //删除用户信息,
    DeleteUserById:function DeleteUserById(UserId){
        return User.remove({_id:UserId})
            .exec()
    }
    /**
     * 本来想做嵌套查询的，没想到，提示信息都是对的，
     * 说是添加成功了，硬是查询不到，自己没有耐心了，
     * 得加快点速度，还是分开来做吧，可以留下这点，
    //购物车添加商品信息
    addCartById:function addCartById(UserId,data){
        return User.update({_id:UserId},{$set:data})
            .exec();
    },
    //查询购物车商品信息
    selectCart:function selectCart(){
        return User.find({cart:{isBuy:1}})
            .exec()
    },
    //查询购物车，isbuy 为2 的商品   已下订单
    findGoodsOrder:function findGoodsOrder(){
        return User.find({cart:{isBuy:2}})
            .exec()
    },
    //查询购物车，isbuy 为3 的商品    已购买
    findGoodsOrdered:function findGoodsOrdered(){
        return User.find({cart:{isBuy:3}})
            .exec()
    }*/

}