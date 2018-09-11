const sendError=require('../../function/sendError.js');
const db=require('../../mode/dblink.js');
const send=require('../../mode/phoneVerify.js');

module.exports={
	send(req,res,next){
        // let phone=req.body.phone;
        // let verify=require('../../function/index.js').getStr(4);
        // send(phone,verify);
        // req.session.verify=verify;
   
        let verify='1234';
        req.session.verify=verify;
        next();
    },
    check(req,res,next){
    	if(!req.session.verify){
    		sendError.error(req,res,'没有获取验证码');
    	}else{
    		let verify1=req.body.verify;
    		let verify=req.session.verify;
    		if(verify==verify1){
    			next();
    		}else{
    			sendError.error(req,res,'验证码错误');
    		}
    	}
    	
    }
}