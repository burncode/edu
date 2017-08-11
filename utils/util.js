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

function getService(active) {
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
/**
 * 发送请求
 */
function doRequest(url, method, data, success) {
  wx.request({
    url: getService("dev") + url,
    data: data,
    method: method,
    success: function (res) {
      var status = res.statusCode;
      switch (status) {
        case 404:
          wx.showModal({
            title: '404',
            content: "没有对应的接口",
          })
          return;
        case 502:
          wx.showModal({
            title: '服务器异常(502)',
            content: "服务器开小差了...",
          })
          return;
        case 500:
          wx.showModal({
            title: '服务器异常(500)',
            content: res,
          })
          return;

      }
      if (res.data.code != 0) {
        wx.showModal({
          title: '服务器异常(res.data.code)',
          content: res.data.msg,
        })
      }

      success && success(res.data.data);
    },
    fail: function (error) {

      wx.showModal({
        title: '网络异常',
        content: "请确保证你的网络状态" + JSON.stringify(error),
      })
    }
  })
}

/**
 * 发送get请求
 */
function doGet(url, data, success) {

  wx.request({
    url: getHost() + url,
    data: data,
    method: "GET",
    success: function (res) {
      var status = res.statusCode;
      switch (status) {
        case 404:
          wx.showModal({
            title: '404',
            content: "没有对应的接口",
          })
          return;
        case 502:
          wx.showModal({
            title: '服务器异常',
            content: "服务器开小差了...",
          })
          return;
        case 500:
          wx.showModal({
            title: '服务器异常',
            content: res,
          })
          return;

      }
      if (res.data.code != 0) {
        wx.showModal({
          title: '服务器异常',
          content: res.data.msg,
        })
      }
      success && success(res.data.data);
    },
    fail: function (error) {
      wx.showModal({
        title: '服务器异常',
        content: "服务器开小差了...",
      })
    }
  })
}
/**
 * 发送post请求
 */
function doPost(url, data, success) {

  wx.request({
    url: getHost() + url,
    data: data,
    method: "POST",
    success: function (res) {
      var status = res.statusCode;
      switch (status) {
        case 404:
          wx.showModal({
            title: '404',
            content: "没有对应的接口",
          })
          return;
        case 502:
          wx.showModal({
            title: '服务器异常',
            content: "服务器开小差了...",
          })
          return;
        case 500:
          wx.showModal({
            title: '服务器异常',
            content: res,
          })
          return;
      }

      if (res.data.code != 0) {
        wx.showModal({
          title: '服务器异常',
          content: res.data.msg,
        })
      }
      success && success(res.data.data);
    },
    fail: function (error) {
      wx.showModal({
        title: '服务器异常',
        content: "服务器开小差了...",
      })
    }
  })
}
/**
 * 发送del请求
 */
function doDel(url, data, success) {

  wx.request({
    url: getHost() + url,
    data: data,
    method: "DELETE",
    success: function (res) {
      var status = res.statusCode;
      switch (status) {
        case 404:
          wx.showModal({
            title: '404',
            content: "没有对应的接口",
          })
          return;
        case 502:
          wx.showModal({
            title: '服务器异常',
            content: "服务器开小差了...",
          })
          return;
        case 500:
          wx.showModal({
            title: '服务器异常',
            content: res,
          })
          return;

      }

      if (res.data.code != 0) {
        wx.showModal({
          title: '服务器异常',
          content: res.data.msg,
        })
      }
      success && success(res.data.data);
    },
    fail: function (error) {
      wx.showModal({
        title: '服务器异常',
        content: "服务器开小差了...",
      })
    }
  })
}
/**
 * function
 */
function doPut(url, data, success) {

  wx.request({
    url: getHost() + url,
    data: data,
    method: "PUT",
    success: function (res) {
      var status = res.statusCode;
      switch (status) {
        case 404:
          wx.showModal({
            title: '404',
            content: "没有对应的接口",
          })
          return;
        case 502:
          wx.showModal({
            title: '服务器异常',
            content: "服务器开小差了...",
          })
          return;
        case 500:
          wx.showModal({
            title: '服务器异常',
            content: res,
          })
          return;
      }

      if (res.data.code != 0) {
        wx.showModal({
          title: '服务器异常',
          content: res.data.msg,
        })
      }
      success && success(res.data.data);
    },
    fail: function (error) {
      wx.showModal({
        title: '服务器异常',
        content: "服务器开小差了...",
      })
    }
  })
}
module.exports = {
  formatTime: formatTime,
  isNull: isNull,
  isBlank: isBlank,
  doGet: doGet,
  doPost: doPost,
  doDel: doDel,
  doPut: doPut,
  doRequest: doRequest
}
