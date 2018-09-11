const express=require('express');
var router=express.Router();

const common=require('../../middlewares/index/common.js');
const daily=require('../../middlewares/index/daily.js');
router.use(common.checkLogin);

router.post('/create',daily.create)
router.post('/create',function(req,res){
    res.json({res: 1})
});

router.post('/list',daily.list)
router.post('/list',function(req,res){
    res.json({res: 1,body:res.dailyList})
});

router.post('/delete',daily.delete)
router.post('/delete',function(req,res){
    res.json({res: 1})
});

router.post('/addComment',daily.addComment)
router.post('/addComment',function(req,res){
    res.json({res: 1,body:res.body})
});

router.post('/commentList',daily.commentList)
router.post('/commentList',function(req,res){
    res.json({res: 1,body:res.body})
});

module.exports = router;