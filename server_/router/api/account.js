const express=require('express');
var router=express.Router();

const account=require('../../middlewares/index/account.js')

router.use('/login',account.login);
router.use('/login',function(req,res){
	console.log('用户：'+req.body.username+'登陆')
    res.json({res: 1, text: '登陆成功',userInfo:req.session.user})
});

router.use('/logout',account.logout);
router.use('/logout',function(req,res){
	console.log('用户退出登陆')
    res.json({res: 1, text: '退出登陆'})
});

router.use('/registe',account.checkusername);
router.use('/registe',account.createUser);
router.use('/registe',function(req,res){
	console.log('用户注册,uid:'+res.oid)
    res.json({res: 1, text: '注册成功'})
});

router.use('/checkusername',account.checkusername);
router.use('/checkusername',function(req,res){
	console.log('检查用户名：'+req.body.username)
    res.json({res: 1, text: '没有该用户'})
});

router.use('/check',account.checkLogin);
router.use('/check',function(req,res){
    res.json({res: 1})
});

module.exports = router;