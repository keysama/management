const fs=require('fs');
const sendError=require('../../function/sendError.js');
const db=require('../../mode/dblink.js');

module.exports={
    async pro(req,res,next){
        let files=req.files;
        let filenames=[];

        for(let key=0;key<files.length;key++){
            let item=files[key];
            let oldName=item.destination+'/'+item.filename;
            let newName=item.destination+'/'+item.filename+'.'+item.originalname.split('.')[item.originalname.split('.').length-1];
            let lastName=item.originalname.split('.')[item.originalname.split('.').length-1];
            let firstName=item.filename;
            let name=firstName+'.'+lastName;
//改名字
            var res1=await myPro_changeFileName(oldName,newName);
            if(res1===0){sendError.error(req,res,'数据库查询失败');return}
            filenames[key]=name;
        }

        res.filenames=filenames;
        next();
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

function myPro_changeFileName(oldname,newname){
    return new Promise(function(resolve, reject) {
      fs.rename(oldname, newname, function (error) {
            if (error) {
                reject(0)
            }else {
               resolve(1)
            }
        })
    });
}