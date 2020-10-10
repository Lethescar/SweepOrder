// pages/calc/calc.js
let app = getApp();
var PickerData = require('../../config/constant.js')
import Dialog from '@vant/weapp/dialog/dialog';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    total: 0,
    activeNames: ['0'],
    radio: '1',
    balance: 0,
    options:'',
    newgoodslist:[],
    openid:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      options: options
    })
    this.setData({
      total: options.total
    })
    this.start()
    this.getbalance()
  },
  start() {
    const countDown = this.selectComponent('.control-count-down');
    countDown.start();
  },
  finished() {
    Dialog.alert({
      title: '支付超时',
      message: '支付超时，请重新支付！'
    }).then(() => {
      wx.switchTab({
        url: '../shopcart/shopcart',
      })
    });
  },
  onChange(event) {
    this.setData({
      activeNames: event.detail
    });
    this.setData({
      radio: event.detail
    });
  },
  onClick(event) {
    const { name } = event.currentTarget.dataset;
    this.setData({
      radio: name
    });
  },
  getbalance() {
    wx.request({
      url: 'http://localhost:8000/detail/getbalance',
      data: {
        // price: this.data.options.total,
        openid: app.globalData.openid
      },
      success: res => {
        console.log(res.data[0].ubalance)
        this.setData({
          balance: res.data[0].ubalance
        })
      }
    })
  },
  paybtn(){
    if (this.data.balance < this.data.options.total){
      wx.showToast({
        title: '余额不足',
        icon: 'none'
      })
    }else{
      var ids = wx.getStorageSync('ids')
      var ordertime = PickerData.formatTime(new Date());
      var timestamp = Date.parse(new Date());
      timestamp = timestamp / 1000;
      wx.request({
        url: 'http://localhost:8000/detail/updataordercart',
        data: {
          ids: ids,
          openid: app.globalData.openid,
          ordertime: ordertime,
          timestamp: timestamp
        },
        success: res => {
          wx.setStorageSync('orderlist', res.data);
          this.setData({
            newgoodslist: res.data
          })
          console.log('alllist',res.data)
        }
      })
      wx.request({
        url: 'http://localhost:8000/detail/pay',
        data: {
          price: this.data.options.total,
          openid: app.globalData.openid
        },
        success: res => {
          this.setData({
            balance: res.data[0].ubalance
          })
        }
      })
      wx.showToast({
        title: '支付成功',
      })
      wx.switchTab({
        url: '../personal/personal',
      })
    }
  }
})