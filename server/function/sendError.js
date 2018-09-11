module.exports={
	error(req,res,text){
		if(req.method=='POST'){
			res.json({res: 0, text:text})
		}else{
			res.render('../template/error.ejs',{text:text})
		}
 	 }
}