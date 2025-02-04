const app = getApp();
Page({
  data: {
   article:{}
  },
  onLoad: function (options) {
    app.getText('https://www.vvadd.com/wxml_demo/demo.txt?v=2',res => {
      let obj = app.towxml(res.data,'markdown',{
        theme:'light', //主题 dark 黑色，light白色，不填默认是light
        base:"www.xxx.com",
        events:{      //为元素绑定的事件方法
          tap:e => {
            console.log('tap',e);
          },
          change:e => {
            console.log('todo',e);
          }
        }
      });
      //更新解析数据
      this.setData({
        article:obj,
      });
      console.log(obj)
    });
  },
})
