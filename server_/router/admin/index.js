const express=require('express');
var router=express.Router();
const multer = require('multer');

const config=require('../../config/index.js');
const admin=require('../../middlewares/admin/login.js');
const kind=require('../../middlewares/admin/kind.js');
const good=require('../../middlewares/admin/good.js');

router.get('/', function(req,res){
	res.redirect('/admin/admin')
});

router.use('/admin',admin.checkLogin)
router.use('/admin', function(req,res){
	res.render('admin/admin.html');
});

router.get('/login', function(req,res){
	res.render('admin/login.html');
});

router.post('/login',admin.login)
router.post('/login', function(req,res){
	res.redirect('/admin/admin')
});

router.get('/order',admin.checkLogin)
// router.get('/order',kind.showKind)
router.get('/order', function(req,res){
	res.render('admin/order.ejs');
});


module.exports = router;