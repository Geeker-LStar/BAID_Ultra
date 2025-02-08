// 获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: null,
    hasUserInfo: false
  },

  // 页面加载时立即触发登录请求
  onLoad: function () {
    // 检查 wx.StorageSync 中是否存储了 openId
    const openId = wx.getStorageSync('openId');
    
    if (openId) {
      this.setData({
        hasUserInfo: true,
        userInfo: openId // 这里可以根据需要获取用户的实际信息
      });
    }

    this.login()
  },

  // 登录函数
  login: function () {
    wx.login({
      success: res => {
        if (res.code) {
          // 获取到 code 后调用云函数
          wx.cloud.callFunction({
            name: 'wx_login',  // 云函数名称
            data: {
              code: res.code  // 将 code 传递给云函数
            },
            success: (response) => {
              console.log('登录成功，返回数据:', response.result);
              // 这里的 response.result 包含了 openid 和 session_key
              if (response.result.openid) {
                this.setData({
                  userInfo: response.result.openid,  // 保存 openid
                });
                // 可以将 openid 存储到本地缓存
                wx.setStorageSync('openId', response.result.openid);
              }
            },
            fail: (error) => {
              console.error('调用云函数失败', error);
            }
          });
        } else {
          console.log('获取用户登录状态失败！' + res.errMsg);
        }
      }
    });
  },

  // 其他页面逻辑...
})
