// coursedetails.js
var util = require('../../utils/util')
import api from '../../api/api'
import player from '../../utils/player/index'


Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: "",//课程id
    title: ""//课程标题
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var title = options.title;
    this.setData({
      id: options.id,
      title: title
    })
   // wx.showNavigationBarLoading()
    wx.setNavigationBarTitle({
      title: title
    })
  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var id=this.data.id;
    util.doGet(api.content.details+id,function (res) {
      console.log(res)
    }, function (error) {
     
      console.log("error：", error)
    })
    var player = new prismplayer({
      id: 'J_prismPlayer',
      width: '100%',
      rePlay: true,
      autoplay: true,
      showBuffer: true,
      useFlashPrism: true,
      isLive: false,
      useH5Prism: false,
      source: "https://edu-test.dingtax.cn/video/idXadMFzFahmwKbb37MPpSwe.mp4",
      cover: "http://v.dingtax.cn/snapshot/c6335e53c65c4890a28896a8500dbbd600002.jpg"
    });
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