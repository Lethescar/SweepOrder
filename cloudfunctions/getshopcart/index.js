// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'sweep-order-hvyar'
})

// 云函数入口函数
exports.main = async (event, context) => {
  var item = event.itemarr.data
  return item
}