// pages/bug_report/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showPlaceholder: true,
    contentViewHeight: (85/9),
    contentTextareaHeight: 10.4,

    // 用户数据
    title: '',
    content: '',
    images: [],
    openid: '',

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
    console.log('bug 反馈页面已显示');
    this.setData({
      openid: wx.getStorageSync('openId'),
    });
    console.log(this.data.openid);
    
    if (wx.getStorageSync('lang') == 'en') {
      this.setData({
        texts: require("../../i18n/bug_report/en.js"),
      });
    } else {
      this.setData({
        texts: require("../../i18n//bug_report/zh.js"),
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

  // 处理标题输入框输入文字
  titleOnInput(event) {
    let title = event.detail.value;
    this.setData({
      title: title,
    });
  },

  // 处理内容输入框输入文字
  contentOnInput(event) {
    let content = event.detail.value;
    this.setData({
      content: content,
      showPlaceholder: (content.length == 0), // 如果内容长度为0就显示placeholder
    });
    if (this.data.showPlaceholder) {
      // 复原view和textarea的高度
      this.setData({
        contentViewHeight: (85/9),
        contentTextareaHeight: 10.4,
      });
    } else {
      // 计算view和textarea的高度
      const matches = content.match(/(\r\n|\n)/g);
      let lines = matches ? matches.length : 0;
      lines = (lines >= 15) ? 15 : lines; // 回车数
      this.setData({
        // 提前实验每行新增的高度（单位：vh）
        contentViewHeight: (2 + lines * (67/27)),
        contentTextareaHeight: (2.7 + lines * (37/15)),
      });
      console.log(this.data.contentViewHeight, this.data.contentTextareaHeight);
    };
  },

  uploadImages() {
    // 判断图片数量
    if (this.data.images.length < 4) {
      wx.chooseMedia({
        count: 1,
        mediaType: ['image'],
        success: (result) => {
          const path = result.tempFiles[0].tempFilePath;
          console.log('图片的地址是', path);
          this.data.images.push(path);
          this.setData({
            images: [...this.data.images],
          }); // 刷新页面
          console.log(this.data.images);
        },
        fail:(err) => {
          console.error('出错了，原因是：\n', err);
        },
      });
    } else {
      wx.showToast({
        title: this.data.texts.unable_to_upload,
        icon: 'error',
        duration: 2000,
        mask: false,
      });
    };
  },

  // 处理删除图片按钮被点击
  deleteImage(event) {
    // 为了使动画可以播放，使用setTimeout进行延迟
    setTimeout(() => {
      const index = event.currentTarget.dataset.index // 要删除的图片的index
      this.data.images.splice(index, 1);
      this.setData({
        images: [...this.data.images],
      });
    }, 100); // 延迟0.1秒
  }, 

  // 处理用户提交反馈
  submitReport() {
    // 是否必填项已经填写
    if (!this.data.content || !this.data.title) {
      wx.showToast({
        title: this.data.texts.error,  
        icon: 'error',
        duration: 2000,
        mask: false,
      });
    } else {
      // 控制台
      console.groupCollapsed();
      console.log('提交成功，即将输出反馈内容……')
      const timestamp = Date.now();
      console.info('反馈的标题是：\n', this.data.title);
      console.info('反馈的详细描述是：\n', this.data.content);
      console.info('反馈所上传的图片的临时链接是：\n', this.data.images);
      console.info('用户的openid是：\n', this.data.openid);
      console.info('用户提交反馈时的毫秒时间戳是：\n', timestamp);
      console.groupEnd();

      // 上传数据库
      const db = wx.cloud.database();
      db.collection('bug_report').add({
        data: {
          title: this.data.title,
          describtion: this.data.content, // 命名失误
          openid: this.data.openid,
          timestamp: timestamp,
        },
        success: (res) => {
          // 上传照片到云（如有）
          console.log('数据上传成功，开始上传图片……');
          if (this.data.images.length > 0) {
            let num = 0;
            const ID = res._id; // 获取对象ID
            console.group('图片上传结果');
            for (const img of this.data.images) {
              num += 1;
              const imgPath = `bug_report_imgs/${ID}_${num}.jpg`; // 将图片的文件设置为对象数据的ID
              wx.cloud.uploadFile({
                cloudPath: imgPath,
                filePath: img,
                success: (res) => {
                  console.group();
                  console.log(`已上传路径为${imgPath}的图片。`)
                  console.log(res);
                  console.groupEnd();
                },
              });
            };
            console.groupEnd();
          };
        },
      });

      wx.switchTab({
        url: '/pages/me/index',
      });
      wx.showToast({
        title: this.data.texts.success,
      });
    };
  },

})