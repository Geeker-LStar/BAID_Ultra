Page({
  /**
   * 页面的初始数据
   */
  data: {
    openUrl: "https://geekerlstar.com/baidultra/test.php",
  },
  /**
   * 获取请求数据
   */
  handleGetMessage: function (e) {
    console.log(e.detail.data);
    }
  },)