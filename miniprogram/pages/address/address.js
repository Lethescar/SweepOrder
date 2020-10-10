// pages/address/address.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    latitude: 36.681990,
    longitude: 117.063150,
    markers: [{
      id: 1,
      latitude: 36.681990,
      longitude: 117.063150,
      callout: {
        content: '猫咖饮品',          //气泡内容
        color: '#078dc1',            //文本颜色
        borderRadius: 3,             //边框圆角
        borderWidth: 1,              //边框宽度
        borderColor: '#078dc1d6',    //边框颜色
        bgColor: '#ffffff',          //背景色
        padding: 5,                  //文本边缘留白
        textAlign: 'center'          //文本对齐方式。有效值: left, right, center
      }
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function (e) {
    this.mapCtx = wx.createMapContext('myMap')
  },
  getCenterLocation: function () {
    this.mapCtx.getCenterLocation({
      success: function (res) {
        console.log(res.longitude)
        console.log(res.latitude)
      }
    })
  },
  toMoka(){
    let plugin = requirePlugin('routePlan');
    let key = 'LEFBZ-DM5C3-O4O3Y-YLU4T-MZFBT-B6BAE';  //使用在腾讯位置服务申请的key
    let referer = '猫咖';   //调用插件的app的名称
    let endPoint = JSON.stringify({  //终点
      'name': '猫咖饮品',
      'latitude': 36.681990,
      'longitude': 117.063150
    });
    wx.navigateTo({
      url: 'plugin://routePlan/index?key=' + key + '&referer=' + referer + '&endPoint=' + endPoint
    });
  }
})