//app.js
var util = require('/utils/util')

import api from '/api/api'

//var api = require('/api/api.json')

App({

  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function () {
     
    //设置环境
    wx.setStorageSync('active', 'dev')
    wx.setStorageSync('cid', 330100)
    wx.setStorageSync('userInfo', null)

  },

  /**
   * 当小程序启动，或从后台进入前台显示，会触发 onShow
   */
  onShow: function (options) {
    
    console.log(api)

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
        util.doGet(api.bind.check,{ "code": res.code }, function (res) {
           
          var bind = res.bind;
          var openId = res.openId;
          wx.setStorageSync('openId', openId)
          if (!bind) {
            wx.redirectTo({
              url: '/pages/bind/bind'
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

