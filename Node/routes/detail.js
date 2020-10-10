const express=require("express");
const router=express.Router();
const pool=require("../pool");
var arr = []

router.get("/getswiper",(req,res)=>{
  var iaid = req.query.itemid;
  var sql="SELECT * FROM imgarray where iaid = ?";
  pool.query(sql,[iaid],(err,result)=>{
    if(err){
      throw err;
    }else{
      res.send({code:1,msg:"查询成功",data:result});
    }
  });
})
router.get("/getinfo",(req,res)=>{
  var iaid = req.query.itemid;
  var sql="SELECT * FROM goodslist where itemid = ?";
  pool.query(sql,[iaid],(err,result)=>{
    if(err){
      throw err;
    }else{
      res.send({code:1,msg:"查询成功",data:result});
    }
  });
})
router.get("/getsize",(req,res)=>{
  var iaid = req.query.itemid;
  var sql="SELECT * FROM sizelist where slid = ?";
  pool.query(sql,[iaid],(err,result)=>{
    if(err){
      throw err;
    }else{
      res.send({code:1,msg:"查询成功",data:result});
    }
  });
})
router.get("/addItemToShopCart",(req,res)=>{
  req.query.currentSize = JSON.parse(req.query.currentSize)
  req.query.dlist = JSON.parse(req.query.dlist)
  var count = parseInt(req.query.count);
  var currentId = arr.find(r=>r.goodsid === req.query.goodsid && r.openid === req.query.openid)
  // 商品存在于购物车count累加
  if(currentId){
      currentId.count += count
  }else{
      req.query.count = parseInt(req.query.count)
      // req.query.currentSize = JSON.parse(req.query.currentSize)
      // req.query.dlist = JSON.parse(req.query.dlist)
      req.query.checked = true
      req.query.bought = false
      arr.push(req.query)
  }
  res.json(arr)
})
router.get("/shopcart",(req,res)=>{
  res.json(arr.filter(r=>r.openid === req.query.openid))
})
router.get('/updatashopcart',(req,res)=>{
  var openid = req.query.openid;
  var did = req.query.did;
  var length = arr.length;
  for (var i = 0; i < length; i++) {
    if (arr[i].goodsid == did && openid == arr[i].openid){
      arr.splice(i, 1);
      res.json(arr)
      return arr
    }
  }
})
var idlist=[];
var alllist = [];
router.get("/updataordercart",(req,res)=>{
  var ids = eval(req.query.ids);
  idlist = ids.filter(i=>i);
  arr.forEach(item=>{
    ids.forEach(element=>{
      if(item.goodsid==element.goodsid && item.openid == element.openid){
        arr.splice(item);
        return arr;
      }
    })
  });
  idlist.forEach(i => {
    if(i.openid == req.query.openid){
      i.bought = true;
      i.ordertime = req.query.ordertime;
      i.orderId = req.query.timestamp;
    }
  });
  alllist = alllist.concat(idlist);
  res.json(alllist);
})
router.get("/orders",(req,res)=>{
  var count = req.query.countorder;
  var pno = req.query.pnoorder;
  var skipNum = (pno - 1) * count;
  var newArr = (skipNum + count >= alllist.length) ? alllist.slice(skipNum, alllist.length) : alllist.slice(skipNum, skipNum + count);
  res.send(newArr);
})
router.get("/ordercount",(req,res)=>{
  res.send(alllist);
})
router.get("/getbalance",(req,res)=>{
  var openid=req.query.openid;
  var sql = `select ubalance from user where openid=?`;
  pool.query(sql, [openid], (err, result) => {
    if (err){ 
      throw err;
    }else{
      res.send(result);
    }
  })
})
router.get("/pay",(req,res)=>{
  var price = req.query.price;
  var openid=req.query.openid;
  var sql = `select ubalance from user where openid=?`;
  pool.query(sql, [openid], (err, result) => {
    if (err){ 
      throw err;
    }else{
      var ubalance=result[0].ubalance-price;
      if(ubalance>=0){
        sql=`update user set ubalance=? where openid= ? `;
        pool.query(sql,[ubalance,openid],(err,result)=>{
          if(err){
            throw err;
          }else{
            console.log('更新成功')
          }
        })
      }
    }
  })
})
module.exports=router;