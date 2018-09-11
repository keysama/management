const sendError=require('../../function/sendError.js');
const db=require('../../mode/dblink.js');
const fs=require('fs');
const config=require('../../config/index.js');
module.exports={
    async create(req,res,next){
        let title=req.body.title;
        let content=req.body.content;
        let files=req.body.files;
        let pid=req.body.project;

//上传日志，获取id
        let sql1=`INSERT INTO daily(pid,title,content,editor,uploadtime) VALUES(${pid},'${title}','${content}',${req.session.user.id},'${Date.now()}')`;
        let res1=await myPro(sql1);
        if(res1==666){sendError.error(req,res,'数据库查询失败');return}
        let dailyId=res1.insertId;
//上传日志——图片
        for(let i=0;i<files.length;i++){
            let sql2=`INSERT INTO daily_img(did,name,time) VALUES (${dailyId},'${files[i]}','${i}')`;
            let res2=await myPro(sql2);
            if(res2==666){sendError.error(req,res,'数据库查询失败');return} 
        }
        let sql4=`INSERT INTO news (pid,text,time) VALUES (${pid},'${req.session.user.nickname+"上传了施工日志："+title}','${Date.now()}')`;
        let res4=await myPro(sql4);
        console.log('用户'+req.session.user.nickname+'上传了日志('+title+')至项目'+pid+'中');
        next();
    },
    async list(req,res,next){
        let projectId=req.body.pro;

//查日志以及对应作者信息
        let sql=`SELECT daily.*,user.nickname,user.id uid FROM daily left join user on daily.editor=user.id WHERE pid=${projectId}`;
        let res1=await myPro(sql);
        if(res1==666){sendError.error(req,res,'数据库查询失败');return}
        
//查日志对应图片
        for(let i=0;i<res1.length;i++){
            var sql2=`SELECT name,time FROM daily_img WHERE did=${res1[i].id} ORDER BY time`;
            var res2=await myPro(sql2);
            if(res2==666){sendError.error(req,res,'数据库查询失败');return}
            res1[i].imgList=res2;        
        }
 
        res.dailyList=res1;
        next()
    },
    async delete(req,res,next){
        let id=req.body.id;
//查日志包含的图片
        let sql1=`SELECT * FROM daily_img WHERE did=${id}`;
        let res1=await myPro(sql1);
        if(res1==666){sendError.error(req,res,'数据库查询失败');return}
//删除图片
        for(let key=0;key<res1.length;key++){
            let item=res1[key];
            let fileName='./static/'+config.daily_url+item.name;
            let res2=await myPro_deleteFile(fileName);
            if(res2==666){sendError.error(req,res,'文件删除失败');return}
        }
//删除日志
        let sq3=`DELETE FROM daily WHERE id=${id}`;
        let res3=await myPro(sq3);
        if(res3==666){sendError.error(req,res,'数据库查询失败');return}

        console.log('用户'+req.session.user.nickname+'删除了日志:'+id)
        next();
    },
    async addComment(req,res,next){
        let did=req.body.daily;
        let content=req.body.content;
//添加评论       
        let sql1=`INSERT INTO daily_comment(did,uid,content,uploadtime) VALUES (${did},${req.session.user.id},'${content}','${Date.now()}')`;
        let res1=await myPro(sql1);
        if(res1==666){sendError.error(req,res,'添加失败');return}

        console.log('用户'+req.session.user.nickname+'评论了日志:'+did);
//返回插入的数据
        res.body={
            id:res1.insertId,
            nickname:req.session.user.nickname,
            did:did,
            uid:req.session.user.id,
            content:content,
            uploadtime:Date.now()+''
        };
        next();
    },
    async commentList(req,res,next){
        let did=req.body.did;
//查询评论列表
        let sql1=`SELECT daily_comment.*,user.nickname FROM daily_comment LEFT JOIN user on daily_comment.uid=user.id WHERE did=${did}`;
        let res1=await myPro(sql1);
        if(res1==666){sendError.error(req,res,'查询失败');return}
        res.body=res1;
        next();
    }
}

function myPro (sql){
    return new Promise(function(resolve, reject) {
           db(sql, function(error,results){
            if(error){
                console.log(error)
                reject(666)
            }else{
                resolve(results)
            }
        })
    });
}

function orderType(type){
    switch(type){
        case 0:return 'order_sheet_lv';break;
        case 1:return 'order_sheet_gang';break;
        case 2:return 'order_sheet_ban';break;
        case 3:return 'order_sheet_jian';break;
        case 4:return 'order_sheet_fu';break;
    }
}

function myPro_deleteFile(path){
    return new Promise(function(resolve, reject) {
        fs.unlink(path,function(err){
           resolve(1)
        });
    });
}