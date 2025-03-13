// pages/language_and_theme/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 初始化页面数据
    VH: null,
    canvasId: [
      '#darkModeOn',
    ],
    btBgCls: {
      '#darkModeOn': null,
    },

    optionsOn: false,
    optionsProtect: false,

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
    // 计算VH
    const screen_height = wx.getWindowInfo().screenHeight;
    const _VH = screen_height / 100;
    this.setData({
      VH: _VH,
    });

    // 初始化所有canvas
    for (const id of this.data.canvasId) {
      this.init_canvas(id, this.data.VH);
      this.data.btBgCls[id] = getApp().globalData.btBgCl[wx.getStorageSync(id)];
      this.setData({
        btBgCls: this.clone(this.data.btBgCls),
      });
    };
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    if (wx.getStorageSync('lang') == 'en') {
      this.setData({
        texts: require("../../i18n/lang_and_theme/en.js"),
      });
    } else {
      this.setData({
        texts: require("../../i18n/lang_and_theme/zh.js"),
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

  init_canvas(selector, VH) {
    wx.createSelectorQuery()
      .select(selector)
      .fields({node: true, size: true})
      .exec((res) => {
        // 初始化
        const canvas = res[0].node;
        const ctx = canvas.getContext('2d');
        const width = res[0].width;
        const height = res[0].height;
        const dpr = wx.getWindowInfo().pixelRatio;
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        ctx.scale(dpr, dpr);
  
        // 清空画布
        ctx.clearRect(0, 0, width, height);

        // 渲染内部圆圈
        let targetX = wx.getStorageSync(selector)? 4.0 * VH: 1.5 * VH;
        let targetY = 1.4 * VH;
        let r = 1 * VH;
        let startAngle = 0;
        let endAngle = 2 * Math.PI;
        ctx.beginPath();
        ctx.arc(targetX, targetY, r, startAngle, endAngle);
        ctx.fillStyle = getApp().globalData.btArcCl[wx.getStorageSync(selector)];
        ctx.fill();
      });
  },

  handleCanvasClick(event) {
    const id = event.currentTarget.dataset.id;
    wx.setStorageSync(id, !wx.getStorageSync(id));
    const btSts = wx.getStorageSync(id);
    const VH = this.data.VH;
    this.data.btBgCls[id] = getApp().globalData.btBgCl[btSts];
    this.setData({
      btBgCls: this.clone(this.data.btBgCls),
    });
    // 动画
    wx.createSelectorQuery()
      .select(id)
      .fields({node: true, size: true})
      .exec((res) => {
        const canvas = res[0].node;
        const ctx = canvas.getContext('2d');
        const width = res[0].width;
        const height = res[0].height;
        const dpr = wx.getWindowInfo().pixelRatio;
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        ctx.scale(dpr, dpr);

        let targetX = btSts? 1.5 * VH: 4.0 * VH;
        let dX = 0;
        let targetY = 1.4 * VH;
        let r = 1 * VH;
        let startAngle = 0;
        let endAngle = 2 * Math.PI;
        let animation = setInterval(() => {
          dX += btSts? 0.4 * VH: -0.4 * VH;
          dX = Math.abs(dX) >= 2.5 * VH? 2.5 * VH * dX / Math.abs(dX): dX;
          ctx. clearRect(0, 0, width, height);
          ctx.beginPath();
          ctx.arc(targetX + dX, targetY, r, startAngle, endAngle);
          ctx.fillStyle = getApp().globalData.btArcCl[btSts];
          ctx.fill();
          if (Math.abs(dX) >= 2.5 * VH) {clearInterval(animation);};
        }, 16.67);
      });
  },

  clone(obj) {
    let newObj = {};
    for (const key in obj) {
      newObj[key] = obj[key];
    };
    return newObj;
  },

  handleFontStyleAndSize() {
    console.log('你点击了“字体样式和大小”。');
  },

  handleLanguage() {
    console.log('你点击了“语言”');
    if (!this.data.optionsOn) {
      this.setData({
        optionsOn: true,
        optionsProtect: true,
      });
      setTimeout(() => {
        this.setData({
          optionsProtect: false,
        });
      }, 100);
    } else {
      if (!this.data.optionsProtect) {
        setTimeout(() => {
          this.setData({
            optionsOn: false,
          });
          this.init_canvas('#darkModeOn', this.data.VH);
        }, 100);
      };
    };
  },

  handleLeftClick() {
    setTimeout(() => {
      if (this.data.optionsOn) {
        if (!this.data.optionsProtect) {
          this.setData({
            optionsOn: false,
          });
          this.init_canvas('#darkModeOn', this.data.VH);
        };
      };
    }, 10);
  },

  handleChooseLanguage(event) {
    const lang = event.currentTarget.dataset.lang;
    wx.setStorageSync('lang', lang)
    console.log(wx.getStorageSync('lang'));
    this.onShow();
  },
})