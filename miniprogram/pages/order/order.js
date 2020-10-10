// pages/order/order.js
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ordertime:'',
    orderlist:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var orderlist = wx.getStorageSync('orderlist');
    console.log(orderlist);
    this.setData({
      orderlist: orderlist
    })
  },
})