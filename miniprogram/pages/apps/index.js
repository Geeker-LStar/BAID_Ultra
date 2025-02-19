// pages/app/app.js
Page({
  data: { //针对下方按钮和滑动按钮的维护简便化
    head_buttonList: [
      { label: 'App 1', page: 'App 1'}, 
      { label: 'App 2', page: 'App 2'},
      { label: 'App 3', page: 'App 3'},
      { label: 'App 4', page: 'App 4'},
    ], 
    down_buttonList: [
      { logo: '/images/logo1.svg', label: 'Test', content: 'Test', page: 'Test' },
      { logo: '/images/logo2.svg', label: 'Label 2', content: 'Content 2', page: 'app2' },
      { logo: '/images/logo3.svg', label: 'Label 3', content: 'Content 3', page: 'app3' },
      { logo: '/images/logo4.svg', label: 'Label 4', content: 'Content 4', page: 'down4' },
      { logo: '/images/logo5.svg', label: 'Label 5', content: 'Content 5', page: 'down5' },
      { logo: '/images/logo6.svg', label: 'Label 6', content: 'Content 6', page: 'down6' }
    ],
  },

  // 点击按钮跳转到对应的页面
  navigateToApp: function (event) {
    const current_page = event.currentTarget.dataset.app;
    //console.log(current_page);
    wx.navigateTo({
      url: `apps/Lists/${current_page}/${current_page}`
    });
  },
});
