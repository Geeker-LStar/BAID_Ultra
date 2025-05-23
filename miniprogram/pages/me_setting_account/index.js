// pages/me_setting_account/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    texts: null,
    nameDisplayed: null,
    profileSrc: null,
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

    const db = wx.cloud.database();
    console.log(String(wx.getStorageSync('userId')));
    db.collection('names').doc(String(wx.getStorageSync('userId'))).get({
      success: (res) => {
        console.log(res.data.nameDisplayed);
        this.setData({
          nameDisplayed: res.data.nameDisplayed,
        });
      },
      fail: (err) => {
        // 说明用户未登录
        //console.error(err);
        this.setData({
          nameDisplayed: '',
        });
      },
    });

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

  handleProfileClick() {
    // 用户点击头像按钮时的行为
    console.log('我的-设置-账号管理与安全：你点击了头像按钮。');
    if (wx.getStorageSync('userId') != '') {
      if (wx.getDeviceInfo().platform == 'windows') {
        wx.showModal({
          title: this.data.texts.mTitle,
          content: this.data.texts.mContent,
          showCancel: false,
          confirmText: this.data.texts.mConfirm,
          complete: (res) => {},
        });
      } else {
        wx.navigateTo({
          url: '/pages/edit_profile/index',
        });
      };
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
        title: this.data.texts.title,
        content: '',
        editable: true,
        placeholderText: this.data.texts.placeholder,
        complete: (res) => {
          console.log(res);
          const multiLines = !/\n|\r/.test(res.content); // 不包含换行符
          const length = res.content.length <= 8; // 长度小于等于8
          if (res.confirm && multiLines && length) {
            wx.setStorageSync('name', res.content);
            const db = wx.cloud.database();
            const name_displayed = res.content.length <= 5? res.content: `${res.content.slice(0, 4)}...`; // 根据昵称长度，决定显示的昵称
            //console.log(String(wx.getStorageSync('userId')));
            db.collection('names').doc(String(wx.getStorageSync('userId'))).update({
              data: {
                name: res.content,
                nameDisplayed: name_displayed,
              },
              success: (res) => {
                console.log(res);
                wx.showToast({
                  title: this.data.texts.success,
                  icon: 'success',
                  duration: 1000,
                });
                this.setData({
                  nameDisplayed: name_displayed,
                });
              },
              fail: (err) => {
                console.error(err);
              },
            });
          } else {
            wx.showToast({
              title: '昵称过长！',
              icon: 'error',
              duration: 800,
            });
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
    const deviceInfo = wx.getDeviceInfo().model;
    /* 获取屏幕尺寸
    console.group('getwindowinfo'); 
    console.log(wx.getWindowInfo().screenWidth);
    console.log(wx.getWindowInfo().screenHeight);
    console.groupEnd();*/
    console.log(deviceInfo); // 有待进一步完善
    console.log(wx.getDeviceInfo());
  },
})