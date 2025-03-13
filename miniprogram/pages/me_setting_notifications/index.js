// pages/me_setting_notifications/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    VH: null,
    canvasId: [
      '#activateNotifications',
    ],
    btBgCls: {
      '#activateNotifications': null,
    },

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
    // 计算vh对应的px值
    const screen_height = wx.getWindowInfo().screenHeight;
    const _VH = screen_height / 100;
    this.setData({
      VH: _VH,
    });

    // 初始化所有canvas
    for (const id of this.data.canvasId) {
      this.init_canvas(id, this.data.VH);
      // 初始化背景色
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
        texts: require("../../i18n/notifications/en.js"),
      });
    } else {
      this.setData({
        texts: require("../../i18n/notifications/zh.js"),
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

  // 初始化画布
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

  // 处理画布被点击
  handleCanvasClick(event) {
    const id = event.currentTarget.dataset.id;
    // 修改按钮状态
    wx.setStorageSync(id, !wx.getStorageSync(id));
    const btSts = wx.getStorageSync(id);
    const VH = this.data.VH;
    this.data.btBgCls[id] = getApp().globalData.btBgCl[btSts];
    this.setData({
      btBgCls: this.clone(this.data.btBgCls),
    });
    // 施加动画
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
        let dX = 0; // dX = deltaX
        let targetY = 1.4 * VH;
        let r = 1 * VH;
        let startAngle = 0;
        let endAngle = 2 * Math.PI;
        let animation = setInterval(() => {
          dX += btSts? 0.4 * VH: -0.4 * VH; // targetX的偏移
          dX = Math.abs(dX) >= 2.5 * VH? 2.5 * VH * dX / Math.abs(dX): dX;
          ctx.clearRect(0, 0, width, height);
          ctx.beginPath();
          ctx.arc(targetX + dX, targetY, r, startAngle, endAngle);
          ctx.fillStyle = getApp().globalData.btArcCl[btSts];
          ctx.fill();
          if (Math.abs(dX) >= 2.5 * VH) {
            clearInterval(animation);
          };
        }, 16.67);
      });
  },

  // 克隆对象
  clone(obj) {
    let newObj = {};
    for (const key in obj) {
      newObj[key] = obj[key];
    };
    return newObj;
  },
})