Page({
  data: {
    account: '',  // 存储账号
    password: '',  // 存储密码
    errorMessage: '', // 错误提示信息
  },

  // 账号输入框变化时的事件
  onAccountInput: function(event) {
    this.setData({
      account: event.detail.value
    });
  },

  // 密码输入框变化时的事件
  onPasswordInput: function(event) {
    this.setData({
      password: event.detail.value
    });
  },

  // 提交按钮点击事件
  onSubmit: function() {
    const { account, password } = this.data;

    // 在这里写提交逻辑，比如进行验证、请求后台等
    console.log('提交的账号:', account);
    console.log('提交的密码:', password);

    wx.request({
      url: `http://123.56.160.48:520/auth/${this.data.account}`, // 请求 URL
      method: 'POST',
      header: {
        'X-SU-Partner': 'ba5d5a7a1d7fbfcff0cc3e5318421f279dd5f72d0075cd2f93b42ef4e5dbe498',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: {
        password: this.data.password
      },
      success: (res) => { // Arrow function binds `this` correctly
        console.log('请求成功，返回的数据:', res.data); // 打印响应数据
        console.log(res.data.status);
        // 状态码 200 解析 userId
        if (res.data.status === 200 && res.data.userId) {
          this.setData({
            errorMessage: '', // 清空错误提示
            userId: res.data.userId // 如果成功返回userId，进行保存
          });
          // 将 userId 存储到本地存储中
          console.log(res.data.userId);
          wx.setStorageSync('userId', res.data.userId);
          wx.showToast({ title: '登录成功', icon: 'success' });
        } else {
          this.handleError(res.data.status);
        }
      },
      fail: (error) => { // Arrow function binds `this` correctly
        console.error('请求失败：', error); // 打印错误信息
        this.handleError(500); // 服务器错误时调用统一错误处理
      }
    });
  },

  // 处理不同状态码的错误提示
  handleError(status) {
    let errorMessage = '';
    switch (status) {
      case 400:
        errorMessage = '请输入用户名和密码';
        break;
      case 403:
        errorMessage = '用户名或密码错误';
        break;
      case 500:
        errorMessage = 'ooops...服务器错误，请稍后再试，或报告此问题';
        break;
      default:
        errorMessage = '发生未知错误，请稍后再试';
    }

    this.setData({
      errorMessage: errorMessage, // 设置错误信息
      account: '', // 清空账号输入框
      password: '' // 清空密码输入框
    });
    wx.showToast({
      title: errorMessage,
      icon: 'none'
    });
  }
});
