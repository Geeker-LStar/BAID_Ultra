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
        env: "baid-ultra-official-9css8ac4b5e7",
        traceUser: true,
      });
      const buttonEffects = require("./behaviors/animation/animation");
      behaviors: [buttonEffects];
    }

    // “设置”内按钮状态
    if (wx.getStorageSync('settingDataOK') != 'Ok') {
      wx.setStorageSync('settingDataOK', 'Ok');
      wx.settorageSync('#activateNotifications', true)
    };

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
      // 所有按钮canvas的wxml的id
      canvasId: [
        '#activateNotifications', // 开启通知
        '#darkModeOn', // 打开深色模式
      ],
    };

    // “设置”内按钮状态
    for (const id of this.globalData.canvasId) {
      if (wx.getStorageSync(id) == '') {
        // 如果有按钮信息为空，就将执行重置程序。
        console.warn('检测到本地存储的设置选项缺失，已重置设置的全部选项！');
        wx.setStorageSync('#activateNotifications', true);
        wx.setStorageSync('#darkModeOn', true);
        break;
      };
    };

    // 检测语言设置
    if (wx.getStorageSync('lang') == '') {
      console.warn('检测到本地存储的语言设置缺失，已重置为简体中文（zh）！');
      wx.setStorageSync('lang', 'zh');
    };

    // 检测头像设置
    if (wx.getStorageSync('profile') == '') {
      console.warn('检测到头像缺失，已重置用户头像ID！');
      const profileId = this.randomId();
      wx.setStorageSync('profile', profileId);
    };
    
  },
  // 配置 markdown 解析器
  towxml: require('/towxml/index'),
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
  },

  randomId: () => {
    const timestamp = Date.now(); // 当前时间戳（毫秒）
    const randomNum = Math.floor(Math.random() * 1e6); // 0 到 999999 之间的随机数
    const randomID = `${timestamp}${randomNum.toString().padStart(6, '0')}`;
    return randomID;
  },
});
