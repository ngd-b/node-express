var Cart = require('../lib/mongo').Cart;

module.exports = {
    //�����Ʒ��Ϣ�����ﳵ,������ǰ��¼�˵�id
    create:function create(cart){
        return Cart.create(cart).exec()
    },
    /**
     * ����ջ���ַ
     */
    updateAddress:function updateAddress(id,data){
        return Cart.update({_id:id},{$set:data})
            .exec()
    },
    /**ͨ������id����ѯ���ﳵ��Ʒ��Ϣ   isBuy:1
     * ��ҳ��ʾ���״η��ʲ�֪��δ�����ǰ�˵������ʱ����û�д��ڼ�ҳ��ֵ��
     * ����дĬ�Ϸ���ҳ������ֻ�����Ӵ�����������������ˣ�
     * ��������࣬�о��Լ����ڷ����������low
     * @param userId
     * @param pageSize    ÿҳ��ʾ��
     * @param Count       ��Ҫ����������
     * @returns {Array|{index: number, input: string}|RegExpExecArray}
     */
    findgoodsCart:function findgoodsCart(userId,pageSize,Count){
        return Cart.find({userId:userId,isBuy:1})
            .sort({_id:-1})
            .limit(pageSize)
            .skip(Count)
            .exec()
    },
    //�״η�����ʾ
    findCart:function findCart(userId){
        return Cart.find({userId:userId,isBuy:1})
            .sort({_id:-1})
            .limit(4)
            .exec()
    },
    //��ֵ��������
    cart:function cart(userId){
        return Cart.find({userId:userId,isBuy:1})
            .exec()
    },
    //��ѯ���ﳵ��isbuy Ϊ2 ����Ʒ   ���¶���
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
    //��ѯ���ﳵ��isbuy Ϊ3 ����Ʒ    �ѹ���
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
     * ������Ʒ������������ﳵ�У�������һ��û�о����²���
     * ����userId ��goodsId ����
     * ����Ҫ�ˣ�ǰ̨ͨ���ж���û�������Ʒ
     * Ȼ����ִ����Ӧ�Ĳ�����
     * ʵ�ֿ��ܻ��low���ֽ׶���˰�

    updateGoodsCount:function updateGoodsCount(goodsId,data){
        return Cart
            .update({goodsId:goodsId},{$set:data})
            .exec()
    },*/
    /*//ɾ����Ʒ
    removeGoods:function removeGoods(userId,goodsId,isbuy){
        return Cart
            .remove({userId:userId,goodsId:goodsId,isBuy:parseInt(isbuy)})
            .exec();
    },*/
    //�޸�ɾ�����ﳵ����Ʒ��  ����objectID ��ɾ��
    removeGoods:function removeGoods(id){
        return Cart
            .remove({_id:id})
            .exec();
    },
    //ͨ��userID��goodsID ����size��С��ѯĳ����Ʒ������������һ�����򴴽�
    findSingleGoods:function findSingleGoods(userId,goodsId,isbuy,size){
        return Cart
            .findOne({userId:userId,goodsId:goodsId,isBuy:parseInt(isbuy),size:size})
            .exec()
    },
    //����ͬ��Ʒ�������
    addGoodsCount:function addGoodsCount(goodsId,isbuy,data){
        return Cart.update({goodsId:goodsId,isBuy:isbuy},{$inc:{count:data}})
            .exec()
    },
    //��д��Ʒ״̬   �����goodsId ʵ����_id ,���ø��ˣ�̫����
    updateGoodsBuy:function updateGoodsBuy(goodsId,buy){
        return Cart
            .update({_id:goodsId},{$set:buy},{multi:true})
            .exec()
    },
    //��������ɵĶ���   ��¼���£�ֻ�ǲ�����ʾ���ı�isBuy��ֵ
    removeOrderedList:function removeOrderedList(id){
        return Cart
            .update({userId:id,isBuy:3},{$set:{isBuy:4}},{multi:true})
            .exec()
    }

}