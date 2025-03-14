// pages/me/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLogged: undefined,
    name: wx.getStorageSync('name'),
    texts: null,
  },

  onLoad() {
    console.warn('注意：我的页面及其子页面的动画都是简易版，后续请同步至mrh的高级动画。')
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    let userId = wx.getStorageSync('userId');
    this.setData({
      isLogged: (userId != ''),
      name: wx.getStorageSync('name')
    });
    
    // 处理多语言
    if (wx.getStorageSync('lang') == 'en') {
      this.setData({
        texts: require("../../i18n/me/en.js"),
      });
    } else {
      this.setData({
        texts: require("../../i18n/me/zh.js"),
      });
    };
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },

  goToSetting() {
    console.log('我的：正在尝试跳转设置页面……');
    // this.setData({
    //   isLogged: false,
    // })
    wx.navigateTo({
      url: '/pages/me_setting/index',
    });
  },

  goToBugReport() {
    console.log('我的：正在尝试跳转Bug反馈页面……')
    if (!wx.getStorageSync('openId')) {
      console.log('没有微信登录。');
      wx.navigateTo({
        url: '/pages/wx_login/index',
      });
      wx.showToast({
        title: '请登录微信！',
        icon: 'error',
      });
    } else {
      wx.navigateTo({
        url: '/pages/bug_report/index',
      });
    }
  },

  goToLogIn() {
    console.log('我的：正在尝试跳转登录页面……');
    wx.navigateTo({
      url: '/pages/login/index',
    });
  },
})