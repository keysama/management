const sendError=require('../../function/sendError.js');
module.exports={
	checkLogin(req,res,next){
        if(!req.session.user){
            sendError.error(req,res,'没有登陆');
        }else{
            next()
        }
    }
}