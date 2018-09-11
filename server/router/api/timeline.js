const express=require('express');
var router=express.Router();

const timeline=require('../../middlewares/index/timeline.js');
const common=require('../../middlewares/index/common.js');
router.use(common.checkLogin);

router.use('/list',timeline.list);
router.use('/list',function(req,res){
    res.json({res: 1,body:res.body})
});

module.exports = router;
