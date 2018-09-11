const express=require('express');
var router=express.Router();

router.use('/account', require('./account.js'));

router.use('/verify', require('./verify.js'));

router.use('/book', require('./book.js'));

router.use('/pro', require('./pro.js'));

router.use('/communion', require('./communion.js'));

router.use('/order', require('./order.js'));

router.use('/sheet', require('./sheet.js'));

router.use('/file', require('./file.js'));

router.use('/daily', require('./daily.js'));

router.use('/density', require('./density.js'));
module.exports = router;