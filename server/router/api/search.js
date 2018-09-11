const express=require('express');
var router=express.Router();

const common=require('../../middlewares/index/common.js');
const search=require('../../middlewares/index/search.js');
router.use(common.checkLogin);

router.post('/global',search.global)
router.post('/global',function(req,res){
    res.json({res: 1,body:res.body})
});

module.exports = router;