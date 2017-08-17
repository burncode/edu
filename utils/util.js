function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}
/**
 * 判断是否是null
 */
function isNull(str) {
  return str === undefined || str == null
}

/**
 * 判断是否是空白
 */
function isBlank(str) {
  return str == '' || str == null || str === undefined
}

function getService() {
  var active = wx.getStorageSync("active");
  switch (active) {
    case "dev":

      return "http://zyx.tunnel.ifugle.cn/edu/api";

    case "prod":

      return "http://zyx.tunnel.ifugle.cn/edu/api";

    case "test":
      return "http://zyx.tunnel.ifugle.cn/edu/api";

    case "demo":

      return "http://zyx.tunnel.ifugle.cn/edu/api";

    default:
      console.error("环境类型错误:", active, "[dev|test|demo|prod]")
      return "";
  }
}
function getOpenId(){
  return wx.getStorageSync('openId')
}
/**
 * 发送请求
 */
function doRequest(url, method, data, success, error) {
  wx.request({
    url: getService() + url,
    data: data,
    method: method,
    //withCredentials:true,
    header: {
      'content-type': 'application/json',
      "openId": getOpenId()
    },
    success: function (res) {
      
      var status = res.statusCode;
      var msg;
      switch (status) {
        case 400:
          msg = res.data.msg;
          wx.showModal({
            title: '参数异常(400)',
            content: msg,
            showCancel: false
          })
          error && error(msg);
          return;
        case 401:
          msg = res.data;
          wx.showModal({
            title: '401',
            content: msg,
            showCancel: false
          })
          error && error(msg);
          return;
        case 404:
          msg = "没有对应的接口(404)";
          wx.showModal({
            title: '404',
            content: msg,
            showCancel: false
          })
          error && error(msg);
          return;
        case 422:
          msg = res.data.msg;
          wx.showModal({
            title: '服务器异常(422)',
            content: msg,
            showCancel: false
          })
          error && error(msg);
          return;
        case 500:
          msg = res.data.msg;
          wx.showModal({
            title: '服务器异常(500)',
            content: msg,
            showCancel: false
          })
          error && error(msg);
          return;
        case 502:
          wx.showModal({
            title: '服务器异常(502)',
            content: "服务器开小差了...",
            showCancel: false
          })
          return;
      }
      
      var code = isBlank(res.data.code) ? 0 : res.data.code;
      if (code != 0) {
        //console.log("error:",res.data.msg)
        msg = res.data.msg;
        wx.showToast({
          title: msg,
          image: "/image/icon/error.png",
          mask: true,
          duration: 3000
        })
      }
  
      success && success(isBlank(res.data.data) ? "" : res.data.data);
    },
    fail: function (error) {
      console.log("error:",JSON.stringify(error));
      wx.showToast({
        title: error.errMsg,
        image: "/image/icon/error.png",
        mask: true,
        duration: 2500
      })
      error && error(error);
    }
  })
}
/**
 * get
 */
function doGet(url, data, success, error) {
  return doRequest(url, "GET", data, success, error)
}
/**
 * post
 */
function doPost(url, data, success, error) {
  return doRequest(url, "POST", data, success, error)
}
/**
 * PUT
 */
function doPut(url, data, success, error) {
  return doRequest(url, "PUT", data, success, error)
}
/**
 * DELETE
 */
function doDel(url, data, success, error) {
  return doRequest(url, "DELETE", data, success, error)
}
module.exports = {
  formatTime: formatTime,
  isNull: isNull,
  isBlank: isBlank,
  doRequest: doRequest,
  doGet: doGet,
  doPost: doPost,
  doPut: doPut,
  doDel: doDel
}
