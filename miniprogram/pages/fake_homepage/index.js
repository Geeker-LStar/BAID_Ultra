Page({
  data: {
    newsItems: ['1111', '2222', '3333'],

    texts: null,
  },
  onLoad: function() {
    // console.log('页面加载了');
    // console.log(wx.cloud.database);
    wx.setStorageSync('lang', 'en'); // 强制欣赏英文版fake homepage
  },
  onShow: function() {
    if (wx.getStorageSync('lang') == 'en') {
      this.setData({
        texts: require("../../i18n/fake_homepage/en.js"),
      });
    } else {
      this.setData({
        texts: require("../../i18n/fake_homepage/zh.js"),
      });
    };
  },
});
