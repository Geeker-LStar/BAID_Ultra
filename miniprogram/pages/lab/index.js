// pages/lab/index.js
import { checkName } from "../../utils/checkName.js";
import { checkDevice } from "../../utils/checkDevice.js";
import { logOut } from "../../utils/logOut.js";


Page({

  /**
   * 页面的初始数据
   */
  data: {
    buttonStatus: false,
    buttonBgColor: '#14141400', // buttonBackgroundColor
    buttonCcColor: '#141414', // buttonCircleColor

    inputValue: '',
    TBAnimation: {},

    texts: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    if (wx.getStorageSync('lang') == 'en') {
      this.setData({
        texts: require("../../i18n/lab/en.js")
      });
    } else {
      this.setData({
        texts: require("../../i18n/lab/zh.js")
      });
    };
    console.log(require("../../i18n/lab/en.js"));

    /*wx.showModal({
      title: '标题',
      content: '内容',
      showCancel: false,
      complete: (res) => {
        console.log('回调');
      },
    });*/
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    // 计算vh对应的px值
    //const screen_width = wx.getWindowInfo().screenWidth;
    const screen_height = wx.getWindowInfo().screenHeight;
    const VH = screen_height / 100; // 单位px

    wx.createSelectorQuery()
      .select('#theCanvas')
      .fields({node: true, size: true})
      .exec((res) => {
        // Canvas对象
        const the_canvas = res[0].node;
        // 渲染上下文
        const context = the_canvas.getContext('2d');
        // 画布的宽高
        const width = res[0].width;
        const height = res[0].height;
        // 初始化宽高
        const dpr = wx.getWindowInfo().pixelRatio;
        the_canvas.width = width * dpr;
        the_canvas.height = height * dpr;
        context.scale(dpr, dpr);

        // 绘制
        // 清空画布
        context.clearRect(0, 0, width, height)
        // 圆形
        let targetX = 1.5 * VH;
        //let targetX = 4.0 * VH; // Max targetX
        let targetY = 1.4 * VH;
        let r = 1 * VH;
        let StartAngle = 0
        let EndAngle = 2 * Math.PI;
        //console.log(targetX, targetY, r, StartAngle, EndAngle);
        context.beginPath();
        context.arc(targetX, targetY, r, StartAngle, EndAngle);
        context.fillStyle = this.data.buttonCcColor;
        context.fill();
      });
    console.log('按钮初始化完毕');
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

  handleTheButtonClick() {
    console.group('点击按钮的输出');
    console.log(this.theButtonAnimation);
    this.theButtonAnimation.translateX(50).step();
    const animation_export = this.theButtonAnimation.export();
    console.log(animation_export);
    this.setData({
      TBAnimation: animation_export,
    });
    console.log(this.data.TBAnimation);
    console.groupEnd();
  },


  // 用户点击画布时的函数
  handleTheCanvasClick() {
    // 改变data
    this.setData({
      buttonStatus: this.data.buttonStatus? false: true,
    });
    this.setData({
      buttonBgColor: this.data.buttonStatus? '#141414': '#14141400',
      buttonCcColor: this.data.buttonStatus? '#FFFFFF': '#141414',
    });

    // 计算vh和vw对应的px值
    //const screen_width = wx.getWindowInfo().screenWidth;
    const screen_height = wx.getWindowInfo().screenHeight;
    const VH = screen_height / 100; // 单位px

    wx.createSelectorQuery()
      .select('#theCanvas')
      .fields({node: true, size: true})
      .exec((res) => {
        // Canvas对象
        const the_canvas = res[0].node;
        // 渲染上下文
        const context = the_canvas.getContext('2d');
        // 画布的宽高
        const width = res[0].width;
        const height = res[0].height;
        // 初始化宽高
        const dpr = wx.getWindowInfo().pixelRatio;
        the_canvas.width = width * dpr;
        the_canvas.height = height * dpr;
        context.scale(dpr, dpr);

        // 使用setInterval制作动画
        let targetX = this.data.buttonStatus? 1.5 * VH: 4 * VH; // MAX 4vh MIN 1.5vh
        let targetY = 1.5 * VH;
        let r = 1 * VH;
        let startAngle = 0;
        let endAngle = 2 * Math.PI;
        let animation = setInterval(() => {
          context.clearRect(0, 0, width, height);
          context.beginPath();
          context.arc(targetX, targetY, r, startAngle, endAngle);
          context.fillStyle = this.data.buttonCcColor;
          context.fill();
          if (this.data.buttonStatus) {
            // 增加targetX的值（有上限）
            if (targetX < 4.1 * VH){
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
        }, 16.67);

        /*
        // 绘制
        // 清空画布
        context.clearRect(0, 0, width, height)
        // 圆形
        let targetX = 1.5 * VH;
        let targetY = 1.5 * VH;
        let r = 1 * VH;
        let StartAngle = 0
        let EndAngle = 2 * Math.PI;
        //console.log(targetX, targetY, r, StartAngle, EndAngle);
        context.beginPath();
        context.arc(targetX, targetY, r, StartAngle, EndAngle);
        context.fillStyle = '#eeeeee';
        context.fill();*/
      });
  },

  wxcloudexp() {
    const db = wx.cloud.database;
    console.log(db);
  },

  loginAsDeveloper() {
    wx.setStorageSync('userId', '-1');
    wx.setStorageSync('name', '测试人员');
    wx.setStorageSync('pinyin', 'CeShiRenYuan');
    wx.setStorageSync('role', 'developer');
    console.log('已经设置开发人员信息！');
    checkName();
    checkDevice();
  },

  logout() {
    logOut();
  },

  wxlogin() {
    wx.login({
      success: (res) => {
        console.log(res);
      },
    })
  },

  wxcloudupdate() {
    const db = wx.cloud.database();
    console.log(db.collection('test'))
    db.collection('test').get({
      success: (res) => {
        console.log(res);
      },
      fail: (err) => {
        console.warn(err)
      }
    })
  },
})

////////////////////////////////////////////////////////
// 这是一种非常奇妙的注释方式 // 可以把注释像表格一样排版 //
// 换行
////////////////////////////////////////////////////////