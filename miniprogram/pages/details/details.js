// pages/details/details.js
var constant = require('../../config/constant.js')
let app = getApp();
const db = wx.cloud.database();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    options: {},
    swiperlist: [],
    detailList: null,
    goodsid: '',
    detailid: '',
    indicatorDots: true,
    autoplay: true,
    interval: 3000,     // 切换间隔时间
    duration: 500,      // 滑动动画时长
    show: false,
    sizeList: [],
    currentSize: [],
    count: 1,
    openid: ''
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.options = options;
    // console.log(options);
    this.data.detailid = options.itemid
    this.data.openid = app.globalData.openid
    this.getswiper()
    this.getinfo()
    this.getsize()
    wx.setNavigationBarTitle({
      title: '详情',
    })
  },
  // 获取轮播图数据
  getswiper(){
    wx.request({
      url: 'http://localhost:8000/detail/getswiper',
      data: {
        itemid: this.data.options.itemid
      },
      success: res => {
        console.log('轮播数据成功', res.data.data)
        this.setData({
          swiperlist: res.data.data
        })
      }
    })
  },
  // 获取基本信息
  getinfo(){
    wx.request({
      url: 'http://localhost:8000/detail/getinfo',
      data: {
        itemid: this.data.options.itemid
      },
      success: res => {
        console.log('基本信息成功', res.data.data)
        wx.setStorageSync('goodsInfo', res.data.data);
        this.setData({
          detailList: res.data.data
        })
      }
    })
  },
  getsize(){
    wx.request({
      url: 'http://localhost:8000/detail/getsize',
      data: {
        itemid: this.data.options.itemid
      },
      success: res => {
        console.log('规格成功', res.data.data)
        this.setData({
          sizeList: res.data.data,
          currentSize: res.data.data[0]
        })
      }
    })
  },
  // 设置规格
  setSize(event){
    var obj = this.data.sizeList.find(res => res.id === event.currentTarget.dataset.id)
    this.setData({
      currentSize: obj,
      goodsid: obj.id
    })
  },
  // + 
  add(){
    this.setData({
      count: ++this.data.count
    })
  },
  // -
  cut(){
    if (--this.data.count < 1) {
      this.data.count = 1;
    }
    this.setData({
      count: this.data.count
    })
  },
  // 加入购物车
  addCart(){
    if (wx.getStorageSync('islogged')){
      var {
        count, currentSize, openid, goodsid, detailid, detailList
      } = this.data
      var dlist = detailList[0]
      if (goodsid == '') {
        goodsid = this.data.currentSize.id
      }
      // 后台保存到购物车
      // 同一个商品id，count累加
      // 不同id，新增记录
      wx.request({
        url: 'http://localhost:8000/detail/addItemToShopCart',
        data: {
          count, currentSize, openid, goodsid, detailid, dlist
        },
        success: res => {
          console.log('shopcart列表数据', res.data);
          // wx.setStorageSync('shopcatlist', res.data);
          if (res.data) {
            wx.showToast({
              title: '加入成功',
            })
          }
        }
      })
    }else{
      setTimeout(function () {
        wx.switchTab({
          url: '../personal/personal',
        })
      }, 2000);
      wx.showToast({
        title: '请先登录',
        icon: 'none'
      })
    }
    
  },
  // 功能:跳转到分类页面
  linkToshop: function () {
    wx.switchTab({
      url: '../shopcart/shopcart',
    })
  },

  /**
   * 显示 隐藏 
   */
  showPopup() {
    this.setData({ show: true });
  },

  onClose() {
    this.setData({ show: false });
  },
})