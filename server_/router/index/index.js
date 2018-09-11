const express=require('express');
var router=express.Router();
//index
router.use('/', function(req,res){
	res.render('index.html');
});


module.exports = router;