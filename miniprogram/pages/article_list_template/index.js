// pages/example/example.js
Page({
  data: {
    datatableName: '',
    documents: []
  },

  onLoad: function (options) {
    // 1. 获取上一页面传递过来的参数
    const { datatableName } = options;
    this.setData({
      datatableName: datatableName
    });
    console.log('接收到的参数 datatableName:', datatableName);
    
    // 2. 查询数据库 MongoDB 中该数据表的所有文档
    this.queryDataFromDatabase(datatableName);
  },

  queryDataFromDatabase: function (datatableName) {
    const db = wx.cloud.database();
    const collection = db.collection(datatableName);

    // 查询所有文档
    collection.get().then(res => {
      // 过滤出 is_show 为 1 的文档
      const documents = res.data.filter(doc => doc.is_show === 1);
      this.setData({
        documents: documents
      });

      console.log('符合条件的文档:', documents);
    }).catch(err => {
      console.error('查询失败:', err);
    });
  },

  // 跳转到 article_template 页面，并携带 _id
  goToArticle: function (e) {
    const documentId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/article_template/index?id=${documentId}`,
    });
  }
});
