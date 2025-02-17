Page({
  data: {
    userId: null,
    role: null,
    seiueLogged: false,
  },

  onLoad(options) {
    // 页面 A 首次加载时获取并初始化数据
    this.loadData();
  },

  onShow() {
    // 每次页面显示时刷新数据
    console.log('页面 A 显示了！');
    this.loadData();
  },

  loadData() {
    const userId = wx.getStorageSync('userId');  // 获取存储的 userId
    const role = wx.getStorageSync('role');      // 获取存储的 role
    const seiueLogged = userId ? true : false;   // 判断是否登录

    // 更新页面的 data
    this.setData({
      userId: userId,
      role: role,
      seiueLogged: seiueLogged
    });

    console.log('userId:', userId);
    console.log('role:', role);
    console.log('seiueLogged:', seiueLogged);
  },

  // 点击 "通过希悦登录" 按钮时跳转到登录页面
  navigateToLogin() {
    wx.navigateTo({
      url: '/pages/login/index' // 需要跳转到登录页面
    });
  }
});
