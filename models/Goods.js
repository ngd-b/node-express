var Goods = require('../lib/mongo').Goods;

module.exports = {
    //���һ����Ʒ �û���Ӱ���userId,״̬��
    create:function create(goods){
        return Goods.create(goods).exec();
    },

    //��ѯ����Ա��ӵ�������Ʒ��Ϣ
    findAll:function findAll(){
        return Goods
            .find({isUser:{$ne:1}})
            .addCreatedAt()
            .exec();
    },
    //��ѯ�û��Լ������������Ʒ��Ϣ
    findAllUser:function findAllUser(userID){
        return Goods
            .find({userId:userID})
            .addCreatedAt()
            .exec();
    },
    //��ѯ������Ʒ��Ϣ  /��Ȼid �Ƕ�һ�޶��ģ����ǲ�ѯһ����Ʒ����Ϣ�����ǵ�findOne
    findSingleById:function findSingleById(goodsId){
        return Goods
            .findOne({_id:goodsId})
            .addCreatedAt()
            .exec()
    },
    //���굥����Ʒ�����ǵĸ�����������һ��
    incPv:function incPv(goodsId){
        return Goods
            .update({_id:goodsId},{$inc:{pv:1}})
            .exec()
    },
    //ͨ�����Ͳ�ȡ����ȡ��Ʒ��Ϣ
    getGoodsByGenre:function getGoodsByGenre(genre){
        return Goods
            .find({genre:{$regex:genre}})
            .addCreatedAt()
            .exec();
    },
    //������Ʒ��Ϣ
    UpdateGoodsById:function UpdateGoodsById(goodsId,data){
        return Goods.update({_id:goodsId},{$set:data})
            .exec();
    },
    //������Ʒ��Ϣ
    UpdateCountById:function UpdateCountById(goodsId,count){
        return Goods.update({_id:goodsId},{$set:{count:-count}})
            .exec();
    },
    //ɾ����Ʒ��Ϣ,
    DeleteGoodsById:function DeleteGoodsById(goodsId){
        return Goods.remove({_id:goodsId})
            .exec()
    },
    //ͨ��pv���������������Ʒ /������Ʒ
    SelectGoodsByPv:function SelectGoodsByPv(){
        return Goods
            .find()
            .sort({pv:-1})
            .limit(4)
            .addCreatedAt()
            .exec()
    },
    /**
     * ����Ż�������������ʱ���������е���Ʒ
     *
     */
    SelectAllGoodsByPv:function SelectAllGoodsByPv(){
        return Goods
            .find()
            .sort({pv:-1})
            .addCreatedAt()
            .exec()
    },

    //ͨ��_id��ʱ�併�������Ʒ /������Ʒ
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
    //ͨ����ǩ��ȡ����ȡ��Ʒ��Ϣ
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