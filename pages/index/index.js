var util = require('../../utils/util.js')
var app = getApp()
import api from '../../api/api'
Page({
  data: {
    imgUrls: [
      'http://dingtax-edu.oss-cn-hangzhou.aliyuncs.com/cover/id23pcSxc89g5pS6m3HctmYA.jpg',
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    interval: 3000, //一个图片保持时间
    duration: 1000, //动画时间
    demands: [],//点播课程
    demandCount: 0,//点播总数
    lives: [],//直播课程
    liveCount: 0,//直播总数
    downlines: [],//下线课程
    downlineCount: 0,//线下课程总数
    defualtPg: 1,//默认显示第几页
    defualtItem: 3//默认显示多少条
  },
  //下来加载  wx.stopPullDownRefresh();
  onPullDownRefresh: function () {

  },
  onLoad: function (options) {
    var that = this;

    if (util.isBlank(wx.getStorageSync('openId'))) {
      app.getOpenId()
    }

  },
  /**获取课程详情 */
  courseDetails: function (event) {
    var current = event.currentTarget;
    
    wx.redirectTo({
      url: '/pages/course/details/details?id=' + current.id
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  this.courseList();
   
  },
  /**
   * 获取课程列表
   */
  courseList: function () {
    var that = this;

    var   liveCount   =  that.data.liveCount,
      downlineCount   =  that.data.downlineCount,
        demandCount   =  that.data.demandCount,
          loadCount   =  0;



    if (demandCount === 0) {
      util.doGet(api.content.list, { "item": that.data.defualtItem, "pg": that.data.defualtPg, "tp": 1 }, function (res) {
        that.setData({
          demands: res.list,
          demandCount: res.amount
        })
        loadCount++;
      }, function (error) {
        loadCount--;
        console.log("error：", error)
      })
    }

    if (liveCount === 0) {
      util.doGet(api.content.list, { "item": that.data.defualtItem, "pg": that.data.defualtPg, "tp": 2 }, function (res) {
        that.setData({
          lives: res.list,
          liveCount: res.amount
        })
        loadCount++;
      }, function (error) {
        loadCount--;
        console.log("error：", error)
      })
    }

    if (downlineCount === 0) {
      util.doGet(api.content.list, { "item": that.data.defualtItem, "pg": that.data.defualtPg, "tp": 3 }, function (res) {
        that.setData({
          downlines: res.list,
          downlineCount: res.amount
        })
      }, function (error) {
        loadCount--;
        console.log("error：", error)
      })
    }
    
    return loadCount;
  }

})