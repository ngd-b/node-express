module.exports = function(app){
    app.get('/',function(req,res){
        res.redirect('/main');
    });

    app.use('/test',require('./test'));
    app.use('/main',require('./main'));
    app.use('/signup',require('./signup'));
    app.use('/signout',require('./signout'));
    app.use('/personal',require('./personal'));
    app.use('/goodsInfo',require('./goodsInfo'));
    app.use('/manger',require('./manger'));
    app.use('/operation',require('./operation'));
    app.use('/singleGoods',require('./singleGoods'));
    app.use('/auction',require('./auction'));
    // 404 page
    app.use(function (req, res) {
        if (!res.headersSent) {
            res.status(404).render('404');
        }
    });
}