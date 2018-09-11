const express=require('express');
var router=express.Router();

const order=require('../../middlewares/index/order.js');
const common=require('../../middlewares/index/common.js');
router.use(common.checkLogin);

router.use('/add',order.add);
router.use('/add',function(req,res){
	console.log(`用户${req.session.user.nickname}新建订单${req.body.order.title}`)
    res.json({res: 1})
});

router.get('/list',order.list);
router.get('/list',function(req,res){
    res.json({res: 1,body:res.orderList})
});

router.post('/edit',order.edit);
router.post('/edit',function(req,res){
    res.json({res: 1})
});

router.post('/delete',order.delete);
router.post('/delete',function(req,res){
    res.json({res: 1})
});

router.post('/addFile',order.addFile);
router.post('/addFile',function(req,res){
	console.log('用户：'+req.session.user.nickname+'上传了新附件到'+req.body.order)
    res.json({res: 1})
});

router.post('/getWorkers',order.getWorkers);
router.post('/getWorkers',function(req,res){
    res.json({res: 1,body:res.body})
});

router.post('/examine',order.examine);
router.post('/examine',function(req,res){
	console.log('用户：'+req.session.user.nickname+'提交了订单'+req.body.order+'给'+res.body.nickname+'审核')
    res.json({res: 1})
});

router.post('/examineBack',order.examineBack);
router.post('/examineBack',function(req,res){
	console.log('用户：'+req.session.user.nickname+'撤销了订单'+req.body.order+'的审核')
    res.json({res: 1})
});

router.post('/sendAllow',order.sendAllow);
router.post('/sendAllow',function(req,res){
    res.json({res: 1})
});

router.post('/sendBack',order.sendBack);
router.post('/sendBack',function(req,res){
    res.json({res: 1})
});
module.exports = router;
