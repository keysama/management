const sendError=require('../../function/sendError.js');
const db=require('../../mode/dblink.js');

module.exports={
	showKind(req,res,next){
        let sql="SELECT * FROM kind";

        db(sql, function(error,results){
            if(error){
                sendError.error(req,res,'数据库连接错误');
            }else{
               res.kinds=results;
               next();
            }
        })
    }
}