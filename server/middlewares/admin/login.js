const sendError=require('../../function/sendError.js');
const db=require('../../mode/dblink.js');

module.exports={
	checkLogin(req,res,next){
		if(!req.session.admin){
			res.redirect('/admin/login')
		}else{
			next();
		}
	},
	login(req,res,next){
		var username=req.body.username;
		var password=req.body.password;

		  db("SELECT * FROM user WHERE username='"+username+"' AND type=0", function(error,results){
            if(error){
                console.log(error)
                sendError.error(req,res,'数据库连接错误');
            }else{
                if(results[0]){
                    if(results[0].password==password){
                    	req.session.admin=results[0].id;
                    	next()
                    }else{
                    	sendError.error(req,res,'密码错了');
                    }
                }else{
                    next();
                }
            }
        })

	}
}