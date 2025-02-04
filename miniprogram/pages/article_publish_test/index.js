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
    console.log(e.detail.data)
    const data = e.detail.data[0];
    if (data && data.content) {
      console.log(data.content);  // 如果 content 存在，则打印
    } else {
      console.log('没有 content 字段');
    }
  }
  
  },)