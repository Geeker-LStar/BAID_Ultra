// pages/lab/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    condition: true,
    inputValue: '',
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

  /*获取用户id */
  getUserID() {
    let userId = wx.getStorageSync('userId')
    console.log(userId)
    console.log(userId == '') //true为未登录
  },

  consoleInfo() {
    console.info('这是一个重要提示！')
  },

  consoleWarn() {
    console.warn('警告：程序即将崩溃！')
  },

  consoleError() {
    console.warn('错误：未知错误。程序已崩溃。')
  },

  onInput(event) {
    this.setData({
      inputValue: event.detail.value
    });
  },
})

////////////////////////////////////////////////////////
// 这是一种非常奇妙的注释方式 // 可以把注释像表格一样排版 //
// 换行
////////////////////////////////////////////////////////