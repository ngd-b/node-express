var goodsGenre = require('../lib/mongo').GoodsGenre;

//
module.exports = {
    //创建类型
    create:function create(Genre){
        return goodsGenre.create(Genre)
            .exec();
    },
    //查询
    findGenre:function findGenre() {
        return goodsGenre.find()
            .exec()
    },
    //匹配查询
    findGenreByName:function findGenreByName(name){
        return goodsGenre
            .find({name:{$regex:name}})
            .exec();
    },
    //修改
    updateGenre:function updateGenre(genreId,data){
        return goodsGenre
            .update({_id:genreId},{$set:data})
            .exec();
    },
    //删除
    deleteGenre:function deleteGenre(genreId){
        return goodsGenre
            .remove({_id:genreId})
            .exec()
    }
}