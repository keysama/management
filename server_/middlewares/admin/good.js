const sendError=require('../../function/sendError.js');
const config=require('../../config/index.js');
const db=require('../../mode/dblink.js');
const fs=require('fs');

module.exports={
	showGood(req,res,next){
        let sql="SELECT good.*,kind.name,kind.logo FROM good left join kind on good.kind=kind.id";

        db(sql, function(error,results){
            if(error){
                sendError.error(req,res,'数据库连接错误');
            }else{
               res.goods=results;
               var click=results.length*2;
               
               for(var i=0;i<results.length;i++){
                    (function(i){

                        let sql="SELECT * FROM content WHERE good='"+results[i].id+"'";
                        db(sql,function(err,resu){
                            if(error){
                                sendError.error(req,res,'数据库连接错误');
                            }else{
                                res.goods[i].content=resu;
                                click--;
                                if(click==0){
                                      next();
                                }
                            }
                        })

                        let sqll="SELECT * FROM cut WHERE good='"+results[i].id+"'";
                        db(sqll,function(err,resu){
                            if(error){
                                sendError.error(req,res,'数据库连接错误');
                            }else{
                                res.goods[i].cut=resu;
                                click--;
                                if(click==0){
                                      next();
                                }
                            }
                        })


                    })(i)
                  
               }
            }
        })
    },
    uplaodGood(req,res,next){
        let files=req.files;
        var click=files.length;
        res.content={};
        res.cut={};
        (function(click){
        for(let i=0;i<files.length;i++){
            if(files[i].fieldname=='cover'){

               fs.rename(files[i].destination+'/'+files[i].filename, config.coverUrl+files[i].filename+'.'+files[i].originalname.split('.')[1], function (error) {
                    if (error) {
                        console.log(error)
                    } else {
                      res.cover=files[i].filename+'.'+files[i].originalname.split('.')[1];
                      click--;
                      if(click==0){
                        next()
                      }
                    }
                })

            }else{
               if(files[i].fieldname=='content'){
               fs.rename(files[i].destination+'/'+files[i].filename, config.contentUrl+files[i].filename+'.'+files[i].originalname.split('.')[1], function (error) {
                    if (error) {
                        res.json({res: 0, text: '更改文件名时出错啦'});
                    } else {
                      res.content[i]=files[i].filename+'.'+files[i].originalname.split('.')[1];
                      click--;
                      if(click==0){
                        next()
                      }
                    }
                })
             }else{

                fs.rename(files[i].destination+'/'+files[i].filename, config.cutUrl+files[i].filename+'.'+files[i].originalname.split('.')[1], function (error) {
                    if (error) {
                        res.json({res: 0, text: '更改文件名时出错啦'});
                    } else {
                      res.cut[i]=files[i].filename+'.'+files[i].originalname.split('.')[1];
                      click--;
                      if(click==0){
                        next()
                      }
                    }
                })


             }
            }
        }  
        })(click)
    },
    insertGood(req,res,next){
        let title=req.body.title;
        let kind=req.body.kind;
        let price=req.body.price;
        let cover=res.cover;
        let sql="INSERT INTO good(title,cover,price,kind) VALUES ('"+title+"','"+cover+"','"+price+"','"+kind+"')";

        db(sql, function(error,results){
            if(error){
                sendError.error(req,res,'数据库连接错误');
            }else{
               res.gid=results.insertId;
               next();
            }
        })
        
    },
    insertContent(req,res,next){
        let content=res.content;
        let keys=Object.keys(content);
        let id=res.gid;
        var click=Object.keys(content).length;

        (function(ck){
            for(let i=0;i<Object.keys(content).length;i++){
                let sql="INSERT INTO content(good,img) VALUES ('"+id+"','"+content[keys[i]]+"')";
                     db(sql, function(error,results){
                    if(error){
                        sendError.error(req,res,'数据库连接错误');
                    }else{
                        click--;
                        if(click==0){
                            next();
                        }
                    }
                })
            }
        })(click)
    },
    insertCut(req,res,next){
      let cut=res.cut;
      let keys=Object.keys(cut);
      let id=res.gid;
      var click=Object.keys(cut).length;
      console.log('cut::'+cut);
      console.log('cut的keys::'+keys);
      console.log('click::'+click);

      (function(ck){
          for(let i=0;i<Object.keys(cut).length;i++){
            console.log('第'+i+'次上传的截图名是：'+cut[keys[i]])
              let sql="INSERT INTO cut(good,cut) VALUES ('"+id+"','"+cut[keys[i]]+"')";
                   db(sql, function(error,results){
                  if(error){
                    console.log(error)
                      sendError.error(req,res,'数据库连接错误');
                  }else{
                      click--;
                      console.log('第'+click+'个截图上传好了')
                      if(click==0){
                          next();
                      }
                  }
              })
          }
      })(click)
    },
    deleteGood(req,res,next){
      let id=req.query.id;
      let sql="DELETE FROM good WHERE id='"+id+"'";
        db(sql, function(error,results){
          if(error){
              sendError.error(req,res,'数据库连接错误');
          }else{
             next();
            
          }
        })

    }
}