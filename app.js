//app.js
var util = require('/utils/util.js')
App({

  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function () {
    this.getOpenId();
    //设置环境
    wx.setStorageSync('active', 'dev')
    wx.setStorageSync('cid', 330100)
  },

  /**
   * 当小程序启动，或从后台进入前台显示，会触发 onShow
   */
  onShow: function (options) {
    if (util.isBlank(wx.getStorageSync('userInfo'))) {
      this.getOpenId();
    }
  },

  /**
   * 当小程序从前台进入后台，会触发 onHide
   */
  onHide: function () {

  },

  onError: function (msg) {

  },
  getOpenId: function () {
    var that = this;

    wx.login({
      success: function (res) {
 
        //验证是否绑定
        util.doGet("/auth/wx/xiaochengxu/bind",{ "code": res.code }, function (res) {

          var openId = res.openId;
          if (!util.isBlank(openId)) {

            wx.redirectTo({
              url: '/pages/bind/bind?openId=' + openId
            })
          } else {

            wx.setStorageSync('userInfo', res.userInfo)
           
          }
        });
      },
      fail: function (error) {
        wx.showModal({
          title: '小程序异常',
          content: error.errMsg,
        })
      }
    })

  }
})

