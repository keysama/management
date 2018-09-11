const express=require('express');
var router=express.Router();

const communion=require('../../middlewares/index/communion.js');
const common=require('../../middlewares/index/common.js');
router.use(common.checkLogin);

router.use('/proInvite',communion.proInvite);
router.use('/proInvite',function(req,res){
    res.json({res: 1, body:res.invite})
});

router.use('/proInviteAgree',communion.proInviteAgree);
router.use('/proInviteAgree',function(req,res){
    res.json({res: 1})
});

router.use('/proInvitedisagree',communion.proInvitedisagree);
router.use('/proInvitedisagree',function(req,res){
    res.json({res: 1})
});

module.exports = router;