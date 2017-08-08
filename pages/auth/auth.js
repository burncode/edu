Page({
  data: {
    motto: '新芽小课需要获取你的头像、昵称信息'
  },
  openSetting: function () {
    wx.openSetting({
      success: (res) => {

        res.authSetting = {
          "scope.userInfo": true,
          "scope.userLocation": true
        }

      }
    })
  },
  onLoad: function () {

  }
})
