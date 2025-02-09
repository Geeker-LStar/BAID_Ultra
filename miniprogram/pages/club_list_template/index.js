Page({
  data: {
    clubList: [],  // 用于存储社团数据
    currentCategory: 'all',  // 当前选择的分类
  },

  // 页面加载时默认显示所有社团
  onLoad: function () {
    this.loadClubs('all');
  },

  // 过滤社团，根据类别加载数据
  filterClubs: function (e) {
    const category = e.currentTarget.dataset.class;
    this.setData({
      currentCategory: category
    });
    this.loadClubs(category);
  },

  // 根据选择的类别加载社团数据
  loadClubs: function (category) {
    let filter = {};
    if (category === 'all') {
      filter = {};  // 没有过滤条件，获取所有社团
    } else {
      filter = { club_class: parseInt(category) };
    }

    // 使用 wx.cloud.callFunction 获取数据库数据
    wx.cloud.database().collection('test_clubs')
      .where(filter)
      .orderBy('id', 'asc')  // 根据自定义键 id 升序排列
      .get()
      .then(res => {
        this.setData({
          clubList: res.data  // 设置社团列表
        });
      })
      .catch(err => {
        console.error('加载社团数据失败', err);
      });
  },

  // 跳转到社团详情页
  viewClubDetails: function (e) {
    const clubId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/test_show_club/index?id=${clubId}`,
    });
  }
});
