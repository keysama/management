module.exports={
  getStr:function(len){//任意长度随机数
        var str='';
        for(var i=0;i<len;i++){
            str=str+this.getNum(0,9);
        }
        return str;
  },
  getNum:function(min,max){//一位0-9随机数
      var range = max-min;
      var rand=Math.random();
      return(min+Math.round(rand*range));
  }
}