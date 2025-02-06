// pages/me/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLogged: undefined,
  },

  onLoad() {
    console.log("me-onload")
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
    console.log('me-onshow')
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

  /*修改登录状态 */
  alterUserId() {
    let userId = wx.getStorageSync('userId');
    this.setData({
      userId: userId,
    });
    if (userId == undefined) {
      console.log('用户id为空');
    }
    else {
      console.log('用户id不是空')
    }
  },

  goToSetting() {
    console.log('我的：正在尝试跳转设置页面……');
    wx.navigateTo({
      url: '/pages/me_setting/index',
    });
  }

})