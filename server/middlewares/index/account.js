const sendError=require('../../function/sendError.js');
const db=require('../../mode/dblink.js');

module.exports={
	checkusername(req,res,next){
		let name=req.body.username;
        let sql=`SELECT id FROM user WHERE username='${name}'`;
	    db(sql, function(error,results){
            if(error){
                console.log(error)
                sendError.error(req,res,'数据库连接错误');
            }else{
                if(results[0]){
                    sendError.error(req,res,'账户已经注册了');
                }else{
                    next();
                }
            }
        })
    },
    async createUser(req,res,next){
        let username=req.body.username;
        let nickname=req.body.nickname;
        let password=req.body.password;
        let password2=req.body.password2;
        let phone=req.body.phone;
        let verify=req.body.verify;
        if(username==''||nickname==''||password==''||phone==''||verify==''){
            sendError.error(req,res,'注册信息不完整');
            return;
        }
        if(password!=password2){
            sendError.error(req,res,'两次密码不一样');
            return;
        }
        if(!/[0-9]{11}/.test(phone)){
            sendError.error(req,res,'手机号不合法');
            return;
        }
        if(verify!=req.session.verify){
            sendError.error(req,res,'验证码错误');
            return;
        }
        let sql=`INSERT INTO user(username,nickname,phone,password) VALUES ('${username}','${nickname}','${phone}','${password}')`;
        let res1=await myPro(sql);
        if(res1===0){sendError.error(req,res,'数据库连接错误');}
        res.oid=res1.insertId;

        let sql2=`INSERT INTO book(holder,name) VALUES (${res1.insertId},'默认分组')`;
        let res2=await myPro(sql2);
        if(res2===0){sendError.error(req,res,'数据库连接错误');}
        next();
    },
    login(req,res,next){
        let username=req.body.username;
        let password=req.body.password;
        let type=checkUsernameType(username);

        let sql="SELECT * FROM user WHERE "+type+"='"+username+"'";

        db(sql, function(error,results){
            if(error){
                sendError.error(req,res,'数据库连接错误');
            }else{
                if(!results[0]){sendError.error(req,res,'没有该用户');return;}
                if(results[0].password!=password){sendError.error(req,res,'密码错啦');return;}

                req.session.user=results[0];
                req.session.user.password='***';
                next();
            }
        })

    },
    checkLogin(req,res,next){
        let id=req.body.id;
        if(req.session.user){
            if(req.session.user.id==id){
                next()
            }else{
            sendError.error(req,res,'信息不一致')
            }
        }else{
            sendError.error(req,res,'没有登陆')
        }
    },
    logout(req,res,next){
         delete req.session.user;
         next();
    },
    async saveChange(req,res,next){
        let {id,nickname,departments}=req.body;
        if(id!=req.session.user.id){
            sendError.error(req,res,'用户验证失败');
            return;
        }
        let sql1=`UPDATE user SET nickname='${nickname}',departments='${departments}' WHERE id=${id}`;
        let res1=await myPro(sql1);
        if(res1===0){sendError.error(req,res,'修改失败')};
        next();
    },
    async changePass(req,res,next){
        let {id,oldPass,newPass}=req.body;
        if(req.session.user.id!=id){sendError.error(req,res,'用户验证失败')};
        let sql1=`SELECT password FROM user WHERE id=${id}`;
        let res1=await myPro(sql1);
        if(res1===0 || res1[0].password!=oldPass){sendError.error(req,res,'密码错误');return};
        let sql2=`UPDATE user SET password='${newPass}' WHERE id=${id}`;
        let res2=await myPro(sql2);
        if(res2===0){sendError.error(req,res,'修改失败')};
        next();
    }
}
function checkUsernameType(username){//检查输入的用户名类型
        var isPhoneNUmber=/^1[0-9]{10}$/;
        var isUserName=/^[^\s]+$/;
        var isEmqil=/^\w+@[0-9a-zA-Z]+.[a-zA-Z]{2,4}$/;
        if(isPhoneNUmber.test(username)){
            return 'phone';
        }else{
            return 'username';
        }
}
function myPro (sql){
    return new Promise(function(resolve, reject) {
           db(sql, function(error,results){
            if(error){
                reject(0)
            }else{
               resolve(results)
            }
        })
    });
}
