var util = require('/utils/util.js')
/**
 * 获取openid
 */
function getOpenId(){
  wx.login({
    success: function (res) {
      //验证是否绑定
      util.doRequest("/auth/wx/xiaochengxu/bind", "GET", { "code": res.code }, function (res) {
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
}
module.exports = {
  getOpenId: getOpenId
}
