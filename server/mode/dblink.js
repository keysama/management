const mysql=require('mysql');
var pool=mysql.createPool(require('../config/db.js').trpg);
var query=function(sql,callback){
    pool.getConnection(function(err,conn){
        if(err){
            callback(err,null);
        }else{
            conn.query(sql,function(err,results){
                conn.release();
                callback(err,results);
            })
        }
    })
};
module.exports=query;