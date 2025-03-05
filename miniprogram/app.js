// app.js
App({
  onLaunch: function () {
    if (!wx.cloud) {
      console.error("请使用 2.2.3 或以上的基础库以使用云能力");
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        env: "",
        traceUser: true,
      });
    }

    this.globalData = {
      // 设置“设置”页面内数据
      // 变量名称解释
      // btSts: buttonStatus（按钮的开、关）
      // btBgCl: buttonBackgroudColor
      // btArcCl: buttonArcColor（控制按钮内小圆圈的颜色）
      btArcCl: {
        true: '#FFFFFF',
        false: '#FAFAFA',
      },
      btBgCl: {
        true: '#2D608A',
        false: '#09090D',
      },
      canvasId: [
        '#activateNotifications',
      ],
    };

    // “设置”内按钮状态
    for (const id of this.globalData.canvasId) {
      if (wx.getStorageSync(id) == '') {
        // 如果有按钮信息为空，就将执行重置程序。
        console.warn('检测到本地存储的设置选项缺失，已重置设置的全部选项！');
        wx.setStorageSync('#activateNotifications', true);
        break;
      };
    };
  },
  // 配置 markdown 解析器
  towxml:require('/towxml/index'),
  getText: (url, callback) => {
    wx.request({
      url: url,
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: (res) => {
        if (typeof callback === 'function') {
          callback(res);
        };
      },
      fail(err) {
        console.error('请求失败', err);
      }
    });
  }
});
