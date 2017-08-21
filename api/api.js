module.exports = {
  login: "",
  //小程序绑定
  bind: {
    "check": "/auth/wx/xiaochengxu/bind", //判断是否绑定
    "bind": "/auth/wx/xiaochengxu/bind" //绑定小程序
  },

  //用户信息
  fn: {
    "fnCheck": "/reg/check/"//用户名检测
  },
  /**课程 */
  content: {
    "list": "/content/list",//课程列表
    "details": "/content/detail/",//课程详情
  },
  play:{
    url:"/auth/wx/xiaochengxu/play/"//播放url
  }
}