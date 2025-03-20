// pages/me/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLogged: undefined,
    name: null,
    role: null,
    texts: null,
    profileSrc: null,
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
      name: wx.getStorageSync('name'),
      role: wx.getStorageSync('role'),
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

    // 处理头像
    // 尝试获取云端头像
    const targetURL = `cloud://baid-ultra-official-9css8ac4b5e7.6261-baid-ultra-official-9css8ac4b5e7-1338879792/profile_imgs/${wx.getStorageSync('userId')}.jpg`; // 存储的头像链接（如有）
    wx.cloud.getTempFileURL({
      fileList: [targetURL],
      success: (res) => {
        // 判断res.fileList[0].tempFileURL是否为空
        if (res.fileList[0].tempFileURL == '') {
          // 将图片资源设为本地默认图片
          this.setData({
            profileSrc: "/images/pages_me_images/profile-image-example.png",
          });
        } else {
          // 将图片资源设为返回的临时链接
          this.setData({
            profileSrc: res.fileList[0].tempFileURL,
          });
        };
      },
    });
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