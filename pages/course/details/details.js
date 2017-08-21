// coursedetails.js
var util = require('../../../utils/util')
import api from '../../../api/api'


Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: "",//课程id
    cover: "",//封面
    url: "",
    cover: "",
    tp:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id
    })
    // wx.showNavigationBarLoading()
   
  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    var id = that.data.id;
    util.doGet(api.content.details + id, "", function (res) {
      console.log("res", res)
      that.setData({
        cover: res.cover,
        tp:res.tp
      })
      that.getUrl(res.file.video[0].URL)
      wx.setNavigationBarTitle({
        title: res.title
      })
    }, function (error) {
      console.log("error：", error)
    })

  },
  getUrl: function (videoId){
    var that = this;
    util.doGet(api.play.url + "mp4", { "videoId": videoId} , function (res) {
    console.log("url:", res)
    that.setData({
      url: res
    })
    return res;
  }, function (error) {
    console.log("error：", error)
  })
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

  }
})