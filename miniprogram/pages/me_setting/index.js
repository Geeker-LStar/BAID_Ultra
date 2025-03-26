// pages/me_setting/index.js
import { logOut } from "../../utils/logOut.js";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLogged: false,

    texts: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {
    // 通过 wx.getStorageSync 判断用户是否已登录
    const userId = wx.getStorageSync('userId');
    
    // 如果 userId != ''，表示用户已登录
    this.setData({
      isLogged: (userId != ''),
    });
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
    if (wx.getStorageSync('lang') == 'en') {
      this.setData({
        texts: require("../../i18n/setting/en.js"),
      });
    } else {
      this.setData({
        texts: require("../../i18n/setting/zh.js"),
      });
    };
    // this.setData({texts: require(wx.getStorageSync('lang') == 'en'? '../../i18n/setting/en.js': '../../i18n/setting/zh.js'),});
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

  logOut() {
    logOut();
  },

  goToLogIn() {
    console.log('我的——设置：正在尝试跳转登录页面……');
    wx.navigateTo({
      url: '/pages/login/index',
    });
  },

  goToAccount() {
    if (wx.getStorageSync('userId') != '') {
      wx.navigateTo({
        url: '/pages/me_setting_account/index',
      });
    } else {
      wx.showToast({
        title: this.data.texts.please_log_in,
        icon: 'error',
        duration: 1500,
      });
    };
  },

  goToNotifications() {
    this.onShow();
    wx.showModal({
      title: this.data.texts.mTitle,
      content: this.data.texts.mContent,
      showCancel: false,
      confirmText: this.data.texts.mConfirm,
      complete: (res) => {},
    });
    /*
    wx.navigateTo({
      url: '/pages/me_setting_notifications/index',
    });*/
  },

  goToPrivacy() {
    wx.navigateTo({
      url: '/pages/me_setting_privacy/index',
    });
  },

  goToLanguageAndTheme() {
    wx.navigateTo({
      url: '/pages/language_and_theme/index',
    });
  },
})