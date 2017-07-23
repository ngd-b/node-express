var Manger = require('../lib/mongo').Manger;


module.exports = {
    //注册一个用户
    create:function create(manger){
        return Manger.create(manger).exec();
    },
    //通过用户名获取用户信息
    getUserByName:function getUserByName(name){
        return Manger
            .findOne({name:name})
            .addCreatedAt()
            .exec();
    }
}