const express=require('express');
var router=express.Router();

const common=require('../../middlewares/index/common.js');
const collect=require('../../middlewares/index/collect.js');
router.use(common.checkLogin);

router.post('/total',collect.total)
router.post('/total',function(req,res){
    res.json({res: 1,body:res.body})
});

router.post('/save',collect.save)
router.post('/save',function(req,res){
    res.json({res: 1})
});

module.exports = router;