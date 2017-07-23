var goodsGenre = require('../lib/mongo').GoodsGenre;

//
module.exports = {
    //��������
    create:function create(Genre){
        return goodsGenre.create(Genre)
            .exec();
    },
    //��ѯ
    findGenre:function findGenre() {
        return goodsGenre.find()
            .exec()
    },
    //ƥ���ѯ
    findGenreByName:function findGenreByName(name){
        return goodsGenre
            .find({name:{$regex:name}})
            .exec();
    },
    //�޸�
    updateGenre:function updateGenre(genreId,data){
        return goodsGenre
            .update({_id:genreId},{$set:data})
            .exec();
    },
    //ɾ��
    deleteGenre:function deleteGenre(genreId){
        return goodsGenre
            .remove({_id:genreId})
            .exec()
    }
}