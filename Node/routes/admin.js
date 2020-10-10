const express=require("express");
const router=express.Router();
const pool=require("../pool");

//用户登录
router.get("/login",(req,res)=>{
  //6.1:接收网页传递数据 用户名和密码
  console.log(req.query);
	var aname = req.query.aname;
  var apwd = req.query.apwd;
  console.log(aname);
  console.log(apwd);
	//6.2:创建sql
	var sql = "SELECT * FROM adminlist WHERE aname = ? AND apwd = ?";
	//6.3:执行sql语句并且获取返回结果
	pool.query(sql,[aname,apwd],(err,result)=>{
		//6.4:判断登录是否成功
		if(err)throw err;
		//6.5:将结果返回网页
		if(result.length==0){
			console.log(result);
			res.send({code:-1})
		}else{
		  //获取当前登录用户id
			var aid=result[0].id;
			//将用户id保存session对象中
			// id当前登录：用户凭证
			req.session.aid=aid;
			console.log(req.session)
			res.send({code:1,aid:aid});
		}
	});
})
router.get("/tabledata",(req,res)=>{
	var sql = "SELECT * FROM goodslist";
	pool.query(sql,(err,result)=>{
		if(err)throw err;
		res.send(result);
	});
})
router.get("/delete",(req,res)=>{
  var id = req.query.id;
	var sql = "delete FROM goodslist where id = ?";
	pool.query(sql,[id],(err,result)=>{
		if(err)throw err;
		if (result.affectedRows>0)
		{
			res.send({code:200});
		}else{
			res.send({code:201});
		}
	});
})
router.get('/updata',(req,res)=>{
	var title = req.query.title;
	var price = req.query.price;
	var oriprice = req.query.oriprice;
	var gldescribe = req.query.gldescribe;
	var sizesm = req.query.sizesm;
	var sizemed = req.query.sizemed;
	var sizelar = req.query.sizelar;
	var typeid = req.query.typeid;
	var slid = req.query.slid;
	var glid = req.query.glid;
	var img = req.query.img;
	var sql1 = 'update goodslist set title=?,price=?,oriprice=?,gldescribe=?,typeid=?,img=? where glid=?'
	pool.query(sql1,[title,price,oriprice,gldescribe,typeid,img,glid],(err,result)=>{
		if(err) throw err;
		var sql2 = 'update sizelist set price=? where slid=?&&activeid=1'
		pool.query(sql2,[sizesm,slid],(err,result)=>{
			if(err) throw err;
			var sql3 = 'update sizelist set price=? where slid=?&&activeid=2'
			pool.query(sql3,[sizemed,slid],(err,result)=>{
				if(err) throw err;
				var sql4 = 'update sizelist set price=? where slid=?&&activeid=3'
				pool.query(sql4,[sizelar,slid],(err,result)=>{
					if(err) throw err;
					var sql5 = 'update imgarray set img=? where iaid=?'
					pool.query(sql5,[img,slid],(err,result)=>{
						if(err) throw err;
						if(result.affectedRows>0){
							res.send({code:200})
						}
					})
				})
			})
		})
  })
})
router.get('/list',function(req,res){
	var count=req.query.count;
	var pno=req.query.pno;
	if (!count) count=10;
	if (!pno) pno=1;
	//将值转为整型
	count=parseInt(count);
	pno=parseInt(pno);
	//计算开始的值=（页码-1）*大小
	var start=(pno-1)*count;
	//执行SQL语句
	var sql = "SELECT * FROM goodslist limit ?,?";
	pool.query(sql,[start,count],(err,result)=>{
		if(err)throw err;
		res.send(result);
	});
});
router.get('/itemlist',function(req,res){
	var count=req.query.count;
	var pno=req.query.pno;
	if (!count) count=10;
	if (!pno) pno=1;
	//将值转为整型
	count=parseInt(count);
	pno=parseInt(pno);
	//计算开始的值=（页码-1）*大小
	var start=(pno-1)*count;
	//执行SQL语句
	var sql = "SELECT * FROM typelist limit ?,?";
	pool.query(sql,[start,count],(err,result)=>{
		if(err)throw err;
		res.send(result);
	});
});
router.get('/drinkSize',function(req,res){
	var slid=req.query.slid;
	var sql = "SELECT * FROM sizelist where slid=?";
	pool.query(sql,[slid],(err,result)=>{
		if(err)throw err;
		res.send(result);
	});
});
router.get('/adddata',function(req,res){
	var title = req.query.title;
	var price = req.query.price;
	var oriprice = req.query.oriprice;
	var gldescribe = req.query.gldescribe;
	var sizesm = req.query.sizesm;
	var sizemed = req.query.sizemed;
	var sizelar = req.query.sizelar;
	var typeid = req.query.typeid;
	var slid = req.query.slid;
	slid = slid.substring(slid.length-8);
	console.log(slid);
	var img = req.query.img;
	var sql1 = 'insert into goodslist set title=?,price=?,oriprice=?,gldescribe=?,typeid=?,img=?,itemid=?'
	pool.query(sql1,[title,price,oriprice,gldescribe,typeid,img,slid],(err,result)=>{
		if(err) throw err;
		var sql2 = 'insert into sizelist set price=?,activeid=1,slid=?'
		pool.query(sql2,[sizesm,slid],(err,result)=>{
			if(err) throw err;
			var sql3 = 'insert into sizelist set price=?,activeid=2,slid=?'
			pool.query(sql3,[sizemed,slid],(err,result)=>{
				if(err) throw err;
				var sql4 = 'insert into sizelist set price=?,activeid=3,slid=?'
				pool.query(sql4,[sizelar,slid],(err,result)=>{
					if(err) throw err;
					var sql5 = 'insert into imgarray set img=?,iaid=?'
					pool.query(sql5,[img,slid],(err,result)=>{
						if(err) throw err;
						if(result.affectedRows>0){
							res.send({code:200})
						}
					})
				})
			})
		})
  })
});
module.exports=router;