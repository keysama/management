const express=require('express');

const verify=require('../../middlewares/index/verify.js')

var router=express.Router();

router.use('/send',verify.send)
router.use('/send',function(req,res){
	res.json({res: 1})
});

router.use('/check',verify.check)
router.use('/check',function(req,res){
	res.json({res: 1})
});

module.exports = router;