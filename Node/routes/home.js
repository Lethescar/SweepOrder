const express=require("express");
const router=express.Router();
const pool=require("../pool");

router.get("/getrecommend",(req,res)=>{
  var typeid = req.query.typeid;
  var sql="SELECT * FROM goodslist where typeid = ?";
  pool.query(sql,[typeid],(err,result)=>{
    if(err){
      throw err;
    }else{
      res.send({code:1,msg:"查询成功",data:result});
    }
  });
})

module.exports=router;