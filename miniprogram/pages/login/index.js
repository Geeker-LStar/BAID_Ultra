// pages/login/index.js

Page({
  data: {
    username: '',
    password: '',
    accessToken: ''
  },

  onUsernameInput(e) {
    this.setData({ username: e.detail.value });
  },

  onPasswordInput(e) {
    this.setData({ password: e.detail.value });
  },

  onLogin() {
    const { username, password } = this.data;

    if (!username || !password) {
      wx.showToast({ title: '请输入用户名和密码', icon: 'none' });
      return;
    }

    // 调用云函数
    wx.cloud.callFunction({
      name: 'oauthLogin', // 云函数名称
      data: { username, password },
      success: (res) => {
        console.log('云函数调用成功', res);
        // 在此检查返回的 res.result 结构
        if (res.result && res.result.code === 200) {
          this.setData({ accessToken: res.result.data.access_token });
          wx.showToast({ title: '登录成功', icon: 'success' });
        } else {
          console.error('登录失败，错误信息:', res.result); // 打印返回的错误信息
          wx.showToast({ title: '登录失败: ' + (res.result ? res.result.message : '未知错误'), icon: 'none' });
        }
      },
      fail: (err) => {
        console.error('云函数调用失败', err); // 输出详细的错误信息
        wx.showToast({ title: '网络错误，请重试', icon: 'none' });
      }
    });    
  }
});


