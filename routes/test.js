
/**
 * Created by Administrator on 2017/5/3.
 */
var express = require('express');
var router = express.Router();

//≤‚ ‘
router.get('/',function(req,res,next){
    res.render('test');
});

module.exports = router;