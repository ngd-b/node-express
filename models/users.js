var User = require('../lib/mongo').User;

module.exports = {
    //ע��һ���û�
    create:function create(user){
        return User.create(user).exec();
    },
    //�û���Ϣ���
    addInfo:function addInfo(name,data){
        return User.update({name:name},{$set:data})
    },
    //��ѯ�����û���Ϣ
    findAll:function findAll(){
        return User
            .find()
            .addCreatedAt()
            .exec();
    },
    //ͨ���û�����ȡ�û���Ϣ
    getUserByName:function getUserByName(name){
        return User
            .findOne({name:name})
            .addCreatedAt()
            .exec();
    },
    //�����޸�
    UpdatePassword:function UpdatePassword(name,newpass){
        return User.update({name:name},{$set:{password:newpass}});
    },
    //�����û���Ϣ
    UpdateUserByName:function UpdateUserByName(name,data){
        return User.update({name:name},{$set:data})
            .exec();
    },
    //ɾ���û���Ϣ,
    DeleteUserById:function DeleteUserById(UserId){
        return User.remove({_id:UserId})
            .exec()
    }
    /**
     * ��������Ƕ�ײ�ѯ�ģ�û�뵽����ʾ��Ϣ���ǶԵģ�
     * ˵����ӳɹ��ˣ�Ӳ�ǲ�ѯ�������Լ�û�������ˣ�
     * �üӿ���ٶȣ����Ƿֿ������ɣ�����������㣬
    //���ﳵ�����Ʒ��Ϣ
    addCartById:function addCartById(UserId,data){
        return User.update({_id:UserId},{$set:data})
            .exec();
    },
    //��ѯ���ﳵ��Ʒ��Ϣ
    selectCart:function selectCart(){
        return User.find({cart:{isBuy:1}})
            .exec()
    },
    //��ѯ���ﳵ��isbuy Ϊ2 ����Ʒ   ���¶���
    findGoodsOrder:function findGoodsOrder(){
        return User.find({cart:{isBuy:2}})
            .exec()
    },
    //��ѯ���ﳵ��isbuy Ϊ3 ����Ʒ    �ѹ���
    findGoodsOrdered:function findGoodsOrdered(){
        return User.find({cart:{isBuy:3}})
            .exec()
    }*/

}