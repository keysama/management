const express=require('express');
var router=express.Router();

router.use('/api', require('./api/index.js'));

router.use('/index', require('./index/index'));

router.get('/', function(req, res){
    res.redirect('/index');
});

router.use('/admin', require('./admin/index'));

module.exports = router;