const express=require('express');
var router=express.Router();

const sheet=require('../../middlewares/index/sheet.js');
const common=require('../../middlewares/index/common.js');
router.use(common.checkLogin);

router.post('/info',sheet.info);
router.post('/info',function(req,res){
    res.json({res: 1,body:res.orderInfo})
});

router.post('/delete',sheet.delete);
router.post('/delete',function(req,res){
    res.json({res: 1})
});

router.post('/edit',sheet.edit);
router.post('/edit',function(req,res){
    res.json({res: 1})
});

router.post('/add',sheet.add);
router.post('/add',function(req,res){
    res.json({res: 1,body:res.newSheet})
});

module.exports = router;
