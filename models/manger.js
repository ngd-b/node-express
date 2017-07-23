var Manger = require('../lib/mongo').Manger;


module.exports = {
    //ע��һ���û�
    create:function create(manger){
        return Manger.create(manger).exec();
    },
    //ͨ���û�����ȡ�û���Ϣ
    getUserByName:function getUserByName(name){
        return Manger
            .findOne({name:name})
            .addCreatedAt()
            .exec();
    }
}