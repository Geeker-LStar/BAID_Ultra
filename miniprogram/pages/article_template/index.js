// article_template/index.js
const app = getApp();
Page({
  data: {
    title: '',       // 文章标题
    content: {},     // 文章内容
    publisher: '',   // 发布者
    publish_time: '' // 发布的时间
  },

  onLoad: function(options) {
    const articleId = options.id;  // 获取传递过来的 _id 参数
    console.log(articleId)
    this.getArticleData(articleId);  // 根据 _id 查询文章数据
  },

  // 根据 _id 查询文章数据
  getArticleData: function(id) {
    const db = wx.cloud.database();
    const testCollection = db.collection('test');

    testCollection.doc(id)  // 使用 _id 查询单个文章
      .get({
        success: res => {
          // 更新页面数据
          const article = res.data;
          console.log(article.content);
          let obj = app.towxml(article.content, 'html', {
            theme: 'light', // 主题 dark 黑色，light白色，不填默认是light
            base: "www.xxx.com",
            events: {
              tap: e => {
                console.log('tap', e);
              },
              change: e => {
                console.log('todo', e);
              }
            }
          });
          console.log(obj);
          // 更新解析数据
          // this.setData({
          //   content: obj,
          // });

          this.setData({
            title: article.title,
            content: obj,
            publisher: article.publisher,
            publish_time: article.publish_time
          });
        },
        fail: err => {
          console.error(err);
        }
      });

    
  }
});
