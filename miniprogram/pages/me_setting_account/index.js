// pages/me_setting_account/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

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
  },
  
  handleNameClick() {
    // 用户点击昵称按钮时的行为
    console.log('我的-设置-账号管理与安全：你点击了昵称按钮。');
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