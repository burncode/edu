var app = getApp()
var util = require('../../utils/util.js')
var api = require("../../api/api.js")
Page({

  data: {
    userInfo: "",
    openId: "",
    disabled: false,
    pwd: "",
    userName: "",
    loading: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var openId = wx.getStorageSync('openId');
    var userName = openId.substring(0, 5);
    //防止页面被分享出去后获取不到openId
    if (util.isBlank(openId)) {
      app.getOpenId()
    }

    this.setData({
      openId: openId,
      userName: userName
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
  getUserName: function (e) {
    var that = this;
    var userName = e.detail.value;
    that.setData({
      userName: userName
    });
  },
  /**检查用户名 */
  userNameCheck: function (userName) {
    var reg = /^[\d|\w|_]{3,20}$/;
    var that = this;
    if (reg.test(userName)) {

      //验证用户名是否存在
      util.doGet(api.fn.fnCheck + userName, "", function (res) {

        that.setData({
          userName: userName
        })
        return true;
      }, function (eror) {
        return false;
      });
      return true;
    }

    wx.showToast({
      title: "账号只能是字母数字下划线的3~20位字符",
      image: "/image/icon/error.png",
      mask: true,
      duration: 3000
    })
    return false;
  },
  getPwd: function (e) {
    var that = this;
    that.setData({
      pwd: e.detail.value
    });
    //this.passwordCheck(e.detail.value);
    //this.disabledReg();
  },
  passwordCheck: function (pwd) {
    var reg = /^.{6,50}$/;

    if (reg.test(pwd)) {
      var that = this;
      that.setData({
        pwd: pwd
      });
      return true;
    }
    wx.showToast({
      title: "密码6~50个字符",
      image: "/image/icon/warn.png",
      mask: true,
      duration: 3000
    })
    return false;
  },
  /**
   * 注册用户
   */
  regUser: function () {
    var userInfo = wx.getStorageSync('userInfo');

    var that = this;
    var fn = that.data.userName;
    var pw = that.data.pwd;

    if (that.passwordCheck(pw) && that.userNameCheck(fn)) {
      that.setData({
        loading: true
      })
      var form = {
        "openId": that.data.openId,
        "fn": fn,
        "pw": pw,
        "nickName": userInfo.nickName.substring(0, 80),
        "sex": userInfo.gender,
        "logo": userInfo.avatarUrl.length >= 200 ? "" : userInfo.avatarUrl,
        "cId": wx.getStorageSync('cid')
      }

      util.doPost(api.bind.bind, form, function (res) {
        console.log("reg:", res);
        that.setData({
          loading: false
        })

        wx.switchTab({
          url: "/pages/index/index"
        })
      }, function (error) {
        console.log("error", JSON.stringify(error))
        that.setData({
          loading: false
        })

      });
    }
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