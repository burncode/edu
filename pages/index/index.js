var util = require('../../utils/util.js')
Page({
  data: {
    imgUrls: [
      'http://dingtax-edu.oss-cn-hangzhou.aliyuncs.com/cover/id23pcSxc89g5pS6m3HctmYA.jpg',
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    interval: 3000, //一个图片保持时间
    duration: 1000 //动画时间
  },
  //下来加载  wx.stopPullDownRefresh();
  onPullDownRefresh: function () {

  }, 
  onLoad: function (options) {
    // if (!util.isBlank(wx.getStorageSync('userInfo'))) {
    //   //获取课程列表 //content/list
    //   util.doGet("/content/list", "", function (res) {
    //     console.log("res", res)
    //   }, function (error) {
    //     console.log("error：", error)
    //   })
    // }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (!util.isBlank(wx.getStorageSync('userInfo'))) {
      //获取课程列表 //content/list
      util.doGet("/content/list", { "item": 10,"pg":1,"tp":1}, function (res) {
        console.log("res", res)
      }, function (error) {
        console.log("error：", error)
      })
    }
    
  }

})