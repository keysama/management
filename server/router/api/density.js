const express=require('express');
var router=express.Router();

const density=require('../../middlewares/index/density.js');
const common=require('../../middlewares/index/common.js');
router.use(common.checkLogin);

router.use('/add',density.add);
router.use('/add',function(req,res){
	console.log('用户'+req.session.user.nickname+'上传了线密度')
    res.json({res: 1})
});

router.use('/list',density.list);
router.use('/list',function(req,res){
    res.json({res: 1,body:res.body})
});

router.use('/delete',density.delete);
router.use('/delete',function(req,res){
	console.log('用户'+req.session.user.nickname+'删除了线密度:'+req.body.density)
    res.json({res: 1})
});

router.use('/find',density.find);
router.use('/find',function(req,res){
    res.json({res: 1,body:res.body})
});

module.exports = router;
