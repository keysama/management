const express=require('express');
var router=express.Router();

const pro=require('../../middlewares/index/pro.js');
const common=require('../../middlewares/index/common.js');
router.use(common.checkLogin);

router.use('/add',pro.add);
router.use('/add',function(req,res){
	console.log(`用户${req.session.user.nickname}新建工程${req.body.name}`)
    res.json({res: 1, body:res.pid})
});

router.use('/edit',pro.edit);
router.use('/edit',function(req,res){
	console.log(`用户${req.session.user.nickname}修改工程${req.body.name}`)
    res.json({res: 1})
});

router.use('/delete',pro.delete);
router.use('/delete',function(req,res){
    console.log(`用户${req.session.user.nickname}删除工程${req.body.pid}`)
    res.json({res: 1})
});

router.use('/count',pro.count);
router.use('/count',function(req,res){
    res.json({res: 1, body:res.count})
});

router.use('/all',pro.all);
router.use('/all',function(req,res){
    res.json({res: 1, body:res.pros})
});

router.use('/checkPower',pro.checkPower);
router.use('/checkPower',function(req,res){
    res.json({res: 1, body:res.power})
});

router.use('/info',pro.info);
router.use('/info',function(req,res){
    res.json({res: 1, body:res.info})
});

router.use('/members',pro.members);
router.use('/members',function(req,res){
    res.json({res: 1, body:res.members})
});

router.use('/membersEdit',pro.membersEdit);
router.use('/membersEdit',function(req,res){
    res.json({res: 1})
});

router.use('/details',pro.details);
router.use('/details',function(req,res){
    res.json({res: 1,body:res.body})
});

module.exports = router;