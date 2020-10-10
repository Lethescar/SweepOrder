// pages/shop/shop.js
let app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid: '',
    goodslist: [],
    count:'',
    total: 0,
    checkCount: 0,
    ids: []
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function (options) {
    // this.setData({
    //   goodslist: wx.getStorageSync('shopcatlist')
    // }),
    wx.request({
      url: 'http://localhost:8000/detail/shopcart',
      data: {
        openid: app.globalData.openid
      },
      success: res => {
        this.setData({
          goodslist: res.data
        })
      }
    }),
    this.checkall();
  },
  // + 
  add(e) {
    console.log(e.currentTarget.dataset.id)
    var obj = this.data.goodslist.find( r => r.goodsid === e.currentTarget.dataset.id)
    console.log(obj)
    obj.count++
    this.setData({
      goodslist:this.data.goodslist
    })
    this.calcTotal()
  },
  // -
  cut(e) {
    var obj = this.data.goodslist.find(r => r.goodsid === e.currentTarget.dataset.id)
    if (--obj.count < 1) {
      obj.count = 1;
    }
    this.setData({
      goodslist: this.data.goodslist
    })
    this.calcTotal()
  },
  calcTotal(){
    this.data.total = 0
    this.data.checkCount = 0
    this.data.goodslist.forEach(r => {
      if(r.checked){
        this.data.checkCount++
        this.data.total += r.count * r.currentSize.price
      }
    })
    this.setData({
      total: this.data.total,
      checkCount: this.data.checkCount
    })
  },
  checkall() {
    if (this.data.checkCount === this.data.goodslist.length) {
      this.data.goodslist.forEach(r => {
        r.checked = false
      })
    } else {
      this.data.goodslist.forEach(r => {
        r.checked = true
      })
    }
    this.setData({
      goodslist: this.data.goodslist
    })
    this.calcTotal()
  },
  changeState(e){
    // console.log(e.currentTarget.dataset.id)
    var obj = this.data.goodslist.find(r => r.goodsid == e.currentTarget.dataset.id)
    obj.checked = !obj.checked
    this.setData({
      goodslist: this.data.goodslist
    })
    this.calcTotal()
  },
  gocalc(e){
    var ids = this.data.goodslist.map(r => {
      if(r.checked){
        return (r)
      }
    })
    console.log(ids);
    wx.setStorageSync('ids', ids)
    wx.navigateTo({
      url: '../calc/calc?total=' + e.currentTarget.dataset.total,
    })
  },
  showToast(){
    wx.showToast({
      title: '您还没有选择商品哦',
      icon: 'none'
    })
  },
  deletecart(e){
    var dList = this.data.goodslist;
    var did = e.currentTarget.dataset.id;
    wx.request({
      url: 'http://localhost:8000/detail/updatashopcart',
      data: {
        openid: app.globalData.openid,
        did:did,
      },
      success: res => {
        this.setData({
          goodslist:res.data
        })
      }
    })
  }
})