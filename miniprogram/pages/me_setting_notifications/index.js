// pages/me_setting_notifications/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 变量名称解释
    // btSts: buttonStatus（按钮的开、关）
    // btBgCl: buttonBackgroudColor
    // btArcCl: buttonArcColor（控制按钮内小圆圈的颜色）
    VH: null,
    btSts_activateNotifications: false,
    btBgCl_activeNotifications: '#3B3838', // 开启 #FFFFFF
    btArcCl: '#D4D4D4', // 开启 #00CC6A（绿色）
    app: getApp().globalData,
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
    const VH_ = screen_height / 100;
    this.setData({
      VH: VH_,
    });
    this.init_canvas('#activateNotifications', this.data.VH);
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

  // 初始化画布
  init_canvas(selector, VH) {
    // 渲染内部圆圈
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
        let targetX = 1.5 * VH;
        let targetY = 1.4 * VH;
        let r = 1 * VH;
        let startAngle = 0;
        let endAngle = 2 * Math.PI;
        ctx.beginPath();
        ctx.arc(targetX, targetY, r, startAngle, endAngle);
        ctx.fillStyle = this.data.btArcCl;
        ctx.fill();
      });
  },

  // 渲染画布动画
  draw_animation(selector, btSts, btArcCl) {
    const screen_height = wx.getWindowInfo().screenHeight;
    const VH = screen_height / 100;

    wx.createSelectorQuery()
      .select(selector)
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

        // 动画环节
        let targetX = btSts? 1.5 * VH: 4 * VH;
        let targetY = 1.5 * VH;
        let r = 1 * VH;
        let startAngle = 0;
        let endAngle = 2 * Math.PI;
        let animation = setInterval(() => {
          ctx.clearRect(0, 0, width, height);
          ctx.beginPath();
          ctx.arc(targetX, targetY, r, startAngle, endAngle);
          ctx.fillStyle = btArcCl;
          ctx.fill();
          if (btSts) {
            if (targetX < 4.1 * VH) {
              targetX = targetX > 3.5 * VH? 4.1 * VH: targetX + 0.6 * VH;
            } else {
              clearInterval(animation);
            };
          } else {
            if (targetX > 1.5 * VH) {
              targetX = targetX < 2.1 * VH? 1.5 * VH: targetX - 0.6 * VH;
            } else {
              clearInterval(animation);
            };
          };
        });
      });
  },

  handleActiveNotifications() {
    this.setData({
      btSts_activateNotifications: this.data.btSts_activateNotifications? false: true,
    });
    this.setData({
      btBgCl_activeNotifications: this.data.btSts_activateNotifications? '#FFFFFF': '#3B3838',
      btArcCl: this.data.btSts_activateNotifications? '#00CC6A': '#D4D4D4',
    });
    this.draw_animation('#activateNotifications', this.data.btSts_activateNotifications, this
    .data.btArcCl);
  },
})