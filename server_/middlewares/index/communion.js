const sendError=require('../../function/sendError.js');
const db=require('../../mode/dblink.js');

module.exports={
	proInvite(req,res,next){
        let user=req.session.user.id;
        let sql=`SELECT pro_user.*,pro.id,pro.name,pro.number,(SELECT user.nickname FROM pro_user left join user on pro_user.member=user.id WHERE job=0 AND pro=pro.id)holder FROM pro_user left join pro on pro_user.pro=pro.id WHERE member=${user} AND state=${0}`;
        db(sql, function(error,results){
            if(error){
                sendError.error(req,res,'数据库查询失败');
            }else{
                res.invite=results;
                next();
            }
        })
    },
    proInviteAgree(req,res,next){
        let user=req.session.user.id;
        let id=req.body.id;
        let sql=`UPDATE pro_user SET state=1,jointime='${Date.now()}' WHERE pro=${id} AND member=${user}`;
         db(sql, function(error,results){
            if(error){
                sendError.error(req,res,'数据库查询失败');
            }else{
                next();
            }
        })
    },
    proInvitedisagree(req,res,next){
        let user=req.session.user.id;
        let id=req.body.id;
        let sql=`DELETE FROM pro_user WHERE pro=${id} AND member=${user}`;
         db(sql, function(error,results){
            if(error){
                console.log(error)
                sendError.error(req,res,'数据库查询失败');
            }else{
                next();
            }
        })
    }
}

function myPro (sql){
    return new Promise(function(resolve, reject) {
           db(sql, function(error,results){
            if(error){
                console.log(error)
                reject(0)
            }else{
                resolve(results)
            }
        })
    });
}
