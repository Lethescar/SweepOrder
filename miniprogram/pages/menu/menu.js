// pages/menu/menu.js
// 创建数据库对象
const db = wx.cloud.database();
Page({
  data: {
    activeId:1001,
    typeList:[],
    goodsList:[],
    keywords: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initTypeList(),
    this.initGoodsList()
    // this.getLength()
  },
  initTypeList() {
    wx.request({
      url: 'http://localhost:8000/menu/gettypelist',
      success:res=>{
        this.setData({
          typeList: res.data.data
        })
      }
    })
  },
  // goodsList
  initGoodsList() {
    wx.request({
      url: 'http://localhost:8000/menu/getgoodslist',
      data:{
        typeid: this.data.activeId,
      },
      success: res => {
        this.setData({
          goodsList: res.data.data
        })
      }
    })
  },
  // 获取id
  selectType(e){
    this.setData({
      activeId: e.currentTarget.dataset.id
    })
    this.initGoodsList();
  },
  // 详情页
  goDetail(e){
    wx.navigateTo({
      url: '../details/details?itemid=' + e.currentTarget.dataset.itemid,
    })
  },
  // 跳转
  onSearch() {
    wx.navigateTo({
      url: '../search/search'
    })
  },
  // 二维码跳转
  scanCode(){
    wx.scanCode({
      success(res){
        wx.navigateTo({
          url: '../details/details?itemid=' + res.result,
        })
      }
    })
  },
  
  /**
  * 页面上拉触底事件的处理函数
  */
  onReachBottom: function () {

  },
})  