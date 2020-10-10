// pages/search/search.js
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsList: [],
    keywords: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.onSearch()
  },
  onSearch() {
    wx.showLoading({
      title: '加载中',
    })
    db.collection("goodslist").where({
      title: db.RegExp({
        regexp: this.data.keywords,
        options: 'm',
      })
    })
    .get()                           //查询
      .then(res => {
        console.log(res.data);
        this.setData({
          goodsList: res.data,
        })
        wx.hideLoading()
      })
      .catch(err => {                  //查询失败
        console.log(err)
        wx.hideLoading()
        wx.showToast({
          title: '加载失败',
        })
      })
  },
  inputKw(e) {
    this.data.keywords = e.detail.value
  }
})