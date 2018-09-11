const express=require('express');
var router=express.Router();
const multer = require('multer');

const comment=require('../../middlewares/index/comment.js');
const common=require('../../middlewares/index/common.js');
const file=require('../../middlewares/index/file.js');
// router.use(common.checkLogin);
// 
var comment_uplaod = multer({dest:'./static/upload/comment'});
router.post('/comment',comment_uplaod.any());
router.post('/comment',comment.image)
router.post('/comment',function(req,res){
    res.json({res: 1,body:res.filenames})
});

var pro_uplaod = multer({dest:'./static/upload/pro'});
router.post('/pro',pro_uplaod.any());
router.post('/pro',file.pro)
router.post('/pro',function(req,res){
    res.json({res: 1,body:res.filenames})
});
module.exports = router;
