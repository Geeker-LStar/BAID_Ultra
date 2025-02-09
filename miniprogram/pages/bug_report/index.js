// pages/bug_report/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showPlaceholder: true,

    title: '',
    content: '',
    images: [],
    openid: '',
    time: '',
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

  titleOnInput(event) {
    let title = event.detail.value
    this.setData({
      title: title,
    })
    console.log(this.data.title)
  },

  contentOnInput(event) {
    let content = event.detail.value;
    this.setData({
      content: content,
      showPlaceholder: (content.length == 0),
    });
    console.log(this.data.content);
  },

  uploadImages() {
    wx.chooseMedia({
      count: 3,
      mediaType: ['image'],
      success(result) {
        console.log('用户上传了图片：', result);
        const path = result.tempFiles.path;
        console.log('图片的地址是', path);
        this.data.images.push(path);
      },
      fail(err) {
        console.error('出错了，因为', err)
      },
    })
  },
})