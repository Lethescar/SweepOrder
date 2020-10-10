// pages/home/home.js
const db = wx.cloud.database();
Page({
  data: {
    oneimgs: [],
    // twoimgs: [],
    recommend_list: [],
    fourimgs: [],
    indicatorDots: true,
    autoplay: true,
    interval: 3000,     // 切换间隔时间
    duration: 500,      // 滑动动画时长
  },
  linkTomenu: function(){
    // 功能:跳转到分类页面
    wx.switchTab({
      url: '../menu/menu',
    })
  },
  linkToseckill: function(){
    wx.navigateTo({
      url: '../seckill/seckill'
    })
  },
  linkTodynamic: function () {
    wx.navigateTo({
      url: '../dynamic/dynamic'
    })
  },
  linkToaddress: function () {
    wx.navigateTo({
      url: '../address/address'
    })
  },
  linkTodetails: function (event) {
    wx.navigateTo({
      url: '../details/details?itemid=' + event.currentTarget.dataset.itemid,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    db.collection("so-swipe")      //指定集合
    .get()                         //查询
    .then(res=>{                   //查询成功
      this.setData({
        oneimgs: res.data          //保存数据
      })
    })
    .catch(err=>{                  //查询失败
      console.log(err)
    }),
    db.collection("so-home-pic")
    .get()
    .then(res => {
      this.setData({
        fourimgs: res.data
      })
    })
    .catch(err => {
      console.log(err)
    }),
    this.getRecommend()
  },
  getRecommend(){
    wx.request({
      url: 'http://localhost:8000/home/getrecommend',
      data:{
        typeid:1200
      },
      success: res => {
        console.log('成功', res.data.data)
        this.setData({
          recommend_list: res.data.data
        })
      }
    })
  }
})