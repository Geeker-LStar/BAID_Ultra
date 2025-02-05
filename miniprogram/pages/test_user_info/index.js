Page({
  data: {
    isLoggedIn: false, // 是否登录

    account: "",
    active_status: false,
    admin_classes: [],
    gender: "",
    name: "",
    phone: "",
    pinyin: "",
    role: "",

    schedule: ""
  },

  onLoad: function() {
    // 从本地存储中获取 userId
    const userId = wx.getStorageSync('userId');
    
    // 判断是否登录
    if (userId) {
      // console.log('判断登录状态前 isLoggedIn:', this.data.isLoggedIn);
      this.setData({
        isLoggedIn: true // 用户已登录
      });
      console.log('用户已登录，userId:', userId);
      // console.log('判断登录状态后 isLoggedIn:', this.data.isLoggedIn);
      wx.request({
        url: `http://123.56.160.48:520/info/${userId}`,
        method: 'GET',
        header: {
          'X-SU-Partner': 'ba5d5a7a1d7fbfcff0cc3e5318421f279dd5f72d0075cd2f93b42ef4e5dbe498'
        },
        success: (res) => {  // 使用箭头函数
          console.log(res.data);
      
          this.setData({
            account: res.data.data.account,
            active_status: res.data.data.active_status,
            admin_classes: res.data.data.admin_classes,
            gender: res.data.data.gender,
            name: res.data.data.name,
            phone: res.data.data.phone,
            pinyin: res.data.data.pinyin,
            role: res.data.data.role
          });
        }

        
      });

      console.log('用户已登录，userId:', userId);
      wx.request({
        url: `http://123.56.160.48:520/calendar/${userId}`,
        method: 'GET',
        header: {
          'X-SU-Partner': 'ba5d5a7a1d7fbfcff0cc3e5318421f279dd5f72d0075cd2f93b42ef4e5dbe498'
        },
        data: {
          date: '2025-01-01' // or use start_date and end_date, or date
        },
        success: (res) => {  // 使用箭头函数
          console.log(res.data);
          console.log(res.data.events);
      
          this.setData({
            schedule: res.data.events
          });
        }
      });
      

    } else {
      this.setData({
        isLoggedIn: false // 用户未登录
      });
      console.log('用户未登录');
    }
  }
});
