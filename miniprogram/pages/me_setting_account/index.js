// pages/me_setting_account/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    texts: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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
        texts: require("../../i18n/acc_and_sec/en.js"),
      });
    } else {
      this.setData({
        texts: require("../../i18n/acc_and_sec/zh.js"),
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

  handleProfileClick() {
    // 用户点击头像按钮时的行为
    console.log('我的-设置-账号管理与安全：你点击了头像按钮。');
    if (wx.getStorageSync('userId') != '') {
      wx.navigateTo({
        url: '/pages/edit_profile/index',
      });
    } else {
      wx.showToast({
        title: this.data.texts.please_login,
        icon: 'error',
        duration: 1000,
        mask: false,
      });
    }
  },
  
  handleNameClick() {
    // 用户点击昵称按钮时的行为
    console.log('我的-设置-账号管理与安全：你点击了昵称按钮。');
    if (wx.getStorageSync('userId') != '') {
      wx.showModal({
        title: '请输入新昵称',
        content: '',
        editable: true,
        placeholderText: wx.getStorageSync('name'),
        complete: (res) => {
          console.log(res);
          if (res.confirm) {
            
          };
        },
      });
    } else {
      wx.showToast({
        title: this.data.texts.please_login,
        icon: 'error',
        duration: 1000,
        mask: false,
      });
    }
  },

  handleMyAccount() {
    //用户点击“我的希悦账号”按钮时的行为
    console.log('我的-设置-账号管理与安全：你点击了“我的希悦账号”按钮。');
  },

  handleViewDevices() {
    //用户点击“查看已登录设备”按钮时的行为
    console.log('我的-设置-账号管理与安全：你点击了“查看已登录设备”按钮。');
    const deviceInfo = wx.getDeviceInfo();
    /* 获取屏幕尺寸
    console.group('getwindowinfo'); 
    console.log(wx.getWindowInfo().screenWidth);
    console.log(wx.getWindowInfo().screenHeight);
    console.groupEnd();*/
    console.log(deviceInfo); // 有待进一步完善
  },
})