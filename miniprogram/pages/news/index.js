Page({
  data: {
    newsItems: ['1111', '2222', '3333'],
  },
  onLoad: function() {
    console.log('页面加载了');
  },

   // 跳转到文章列表页面
   goToArticleList: function (event) {
    const datatableName = event.currentTarget.dataset.datatablename; // 获取点击按钮的datatableName
    console.log(datatableName);
    wx.navigateTo({
      url: `/pages/article_list_template/index?datatableName=${datatableName}`, // 跳转并传递参数
    });
  },
});
