var app = getApp()
Page({
  data: {
    motto: '',//提示信息
    authType: ''//授权类型
  },
  openSetting: function () {
    var authType = this.data.authType;
    switch (authType) {
      case "userInfoAuth"://获取用户信息
        wx.openSetting({
          success: (res) => {

            res.authSetting = {
              "scope.userInfo": true,
              "scope.userLocation": true
            }

          }
        })
        return;
    }
  },
  onLoad: function (options) {

    this.setData({
      motto: options.motto,
      authType: options.authType
    })
  },
  onShow: function (options) {
     wx.getSetting({
       success: (res) => {
         var auth = res.authSetting;
          //登录
         if (auth['scope.userInfo']) {
           app.getOpenId();
         }
       }
    })
  },
})
