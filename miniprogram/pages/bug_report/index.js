// pages/bug_report/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showPlaceholder: true,
    contentViewHeight: (85/9),
    contentTextareaHeight: 10.4,
    imagesConuter: 0,

    //用户数据
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
    console.log('bug 反馈页面已显示');
    this.data.imagesConuter = 0;
    this.data.openid = wx.getStorageSync('openid');
    console.log(this.data.openid);
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
    let title = event.detail.value;
    this.setData({
      title: title,
    });
  },

  contentOnInput(event) {
    let content = event.detail.value;
    this.setData({
      content: content,
      showPlaceholder: (content.length == 0),
    });
    console.log(content)
    if (this.data.showPlaceholder) {
      this.setData({
        contentViewHeight: (85/9),
        contentTextareaHeight: 10.4,
      });
    } else {
      const matches = content.match(/(\r\n|\n)/g);
      let lines = matches ? matches.length : 0;
      lines = (lines >= 15) ? 15 : lines;
      this.setData({
        contentViewHeight: (2 + lines * (67/27)),
        contentTextareaHeight: (2.7 + lines * (37/15)),
      });
      console.log(this.data.contentViewHeight, this.data.contentTextareaHeight)
    };
  },

  uploadImages() {
    if (this.data.imagesConuter < 4) {
      wx.chooseMedia({
        count: 1,
        mediaType: ['image'],
        success: (result) => {
          const path = result.tempFiles[0].tempFilePath;
          console.log('图片的地址是', path);
          this.data.imagesConuter += 1;
          this.data.images.push(path);
          this.setData({
            images: [...this.data.images],
          }); //刷新页面
          console.log(this.data.images, this.data.imagesConuter);
        },
        fail:(err) => {
          console.error('出错了，原因是：\n', err);
        },
      });
    } else {
      wx.showToast({
        title: '图片最多四张！',
        icon: 'error',
        duration: 2000,
        mask: true,
      });
    };
  },

  deleteImage(event) {
    const index = event.currentTarget.dataset.index
    this.data.imagesConuter -= 1;
    this.data.imagesConuter = (this.data.imagesConuter < 0) ? 0 : this.data.imagesConuter; // 防止意料之外的错误
    this.data.images.splice(index, 1);
    this.setData({
      images: [...this.data.images],
    });
    console.log(this.data.imagesConuter);
  }, 
})