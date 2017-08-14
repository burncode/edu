var app = getApp()
var util = require('../../utils/util.js')
Page({

  data: {
    userInfo: "",
    openId: "",
    disabled: true,
    pwd: "",
    userName: "",
    userNameIsChange: false,
    loading: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var openId = options.openId;
    //防止页面被分享出去后获取不到openId
    if (util.isBlank(openId)) {
      app.getOpenId()
    }

    this.setData({
      openId: openId,
      userName: openId
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

    var that = this
    //调用登录接口
    wx.getUserInfo({
      success: function (res) {
        that.data.userInfo = res.userInfo
        that.setData({
          userInfo: res.userInfo

        })
        wx.setStorageSync('userInfo', res.userInfo)
      },
      fail: function (error) {
        //授权界面
        wx.navigateTo({
          url: '/pages/auth/auth?motto=' + that.globalData.userInfoAuthTip + "&authType=" + that.globalData.userInfoAuthType
        })
      }
    })

  },
  /**检查用户名 */
  userNameCheck: function (e) {
    var userName = e.detail.value;
    var reg = /^[\d|\w|_]{3,30}$/;
    var that = this;
    that.data.userNameIsChange = true;

    that.setData({
      loading: false,
      disabled: true
    })
    if (!reg.test(userName)) {
      wx.showToast({
        title: "只能是字母数字下划线的3~20位字符",
        image: "/image/icon/error.png",
        mask: true,
        duration: 3000
      })
      return;
    }
    //验证用户名是否存在
    util.doGet("/reg/check/" + userName, "", function (res) {

      that.setData({
        userName: userName
      })
      if (!util.isBlank(that.data.pwd)) {
        that.setData({
          disabled: false
        })
      }
    },function(eror){

      that.setData({
        loading: false,
      })
    });

  },
  passwordCheck: function (e) {
    var pwd = e.detail.value;
    var that = this;

    that.setData({
      disabled: true,
      loading: false
    })
    if (pwd.length < 6) {


      wx.showToast({
        title: "密码太短了",
        image: "/image/icon/warn.png",
        mask: true,
        duration: 2000
      })
      return;
    }


    that.setData({
      pwd: pwd
    });

    if (!util.isBlank(that.data.userName) || !that.data.userNameIsChange) {
      that.setData({
        disabled: false
      })
    }
  },
  /**
   * 注册用户
   */
  regUser: function () {

    var that = this;
    that.setData({
      disabled: true,
      loading: true
    })
    //auth
    var userInfo = wx.getStorageSync('userInfo');

    var form = {
      "openId": that.data.openId,
      "fn": that.data.userName,
      "pw": that.data.pwd,
      "nickName": userInfo.nickName,
      "sex": userInfo.gender,
      "logo": userInfo.avatarUrl,
      "cId": wx.getStorageSync('cid'),
      "tp":73
    }
    
    util.doPost("/auth/wx/xiaochengxu/bind", form, function (res) {
      console.log("reg:",res);
      wx.switchTab({
        url: "/pages/index/index"
      })
    },function(error){
      console.log("error",JSON.stringify(error))
      that.setData({
        loading: false,
      })

    });

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  globalData: {
    userInfoAuthTip: "新芽小课需要获取你的头像、昵称信息",
    userInfoAuthType: "userInfoAuth"
  }
})