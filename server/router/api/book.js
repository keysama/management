const express=require('express');
var router=express.Router();

const book=require('../../middlewares/index/book.js');
const common=require('../../middlewares/index/common.js');
router.use(common.checkLogin);

router.use('/add',book.add);
router.use('/add',function(req,res){
	console.log(`用户${req.session.user.nickname}新建分组${req.body.name}`)
    res.json({res: 1, text: '创建成功'})
});

router.use('/get',book.get);
router.use('/get',function(req,res){
    res.json({res: 1, body:res.book})
});

router.use('/memberAdd',book.memberAdd);
router.use('/memberAdd',function(req,res){
	console.log(`用户${req.session.user.nickname}申请好友${req.body.member}`)
    res.json({res: 1})
});

router.use('/userInfo',book.userInfo);
router.use('/userInfo',function(req,res){
    res.json({res: 1,body:res.info})
});
module.exports = router;