//app.js
var util = require('/utils/util.js')
App({

  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function () {
    this.login();
  },

  /**
   * 当小程序启动，或从后台进入前台显示，会触发 onShow
   */
  onShow: function (options) {
     if (this.globalData.userInfo == null) {
       this.login();
     }
  },

  /**
   * 当小程序从前台进入后台，会触发 onHide
   */
  onHide: function () {

  },

  onError: function (msg) {

  },
  login: function () {
    var that = this;

    wx.login({
      success: function (res) {
        //验证是否绑定
        util.doRequest("/auth/wx/xiaochengxu/bind","GET", { "code": res.code }, function (res) {
          console.log(res.openId)
          var openId = res.openId;
          if (!util.isBlank(openId)) {
            
            wx.redirectTo({
              url: '/pages/bind/bind?openId=' + openId
            })
          } else {
           
            that.globalData.userInfo = res.userInfo
            wx.navigateTo({
              url: '/pages/home/home'
            })
          }
        });
      },
      fail: function (res) {
        wx.showModal({
          title: '小程序异常',
          content: "服务器开小差了...",
        })
      }
    })

  },

  //获取用户信息
  getUserInfo: function (success) {
    var that = this

    //调用登录接口
    wx.getUserInfo({
      withCredentials: true,
      success: function (res) {
        that.globalData.userInfo = res.userInfo
        success && success(res.userInfo);
      },
      fail: function (error) {
        //授权界面
        wx.navigateTo({
          url: '/pages/auth/auth?motto=' + that.globalData.userInfoAuthTip + "&authType=" + that.globalData.userInfoAuthType
        })
      }
    })
  },

  globalData: {
    userInfo: null,
    userInfoAuthTip: "新芽小课需要获取你的头像、昵称信息",
    userInfoAuthType: "userInfoAuth",
    host: 'http://zyx.tunnel.ifugle.cn/edu/api',
    fn: null
  }
})

