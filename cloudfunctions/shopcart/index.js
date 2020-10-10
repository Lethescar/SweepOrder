// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'sweep-order-hvyar'
})

var arr = []
// 云函数入口函数
exports.main = async (event, context) => {
  var count = parseInt(event.count);
  var currentId = arr.find(r => r.detailId === event.detailId && r.openid === event.openid && r.detail_id === event.detail_id)
  // 商品存在于购物车count累加
  if (currentId) {
    currentId.count += count
  } else {
    event.count = parseInt(event.count)
    arr.push(event)
  }
  return arr
}