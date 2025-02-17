// pages/modify_club/index.js

Page({
  data: {
    userId: '',
    clubData: {},
    club_name: '',
    club_class: 0,
    club_intro: '',
    club_contact: '',
    clubClassOptions: ['学科学术类', '文艺创作类', '多元探索类'],
    clubId: '',  // 保存当前社团的 _id
  },

  onLoad() {
    this.getUserInfo();
  },

  // 获取当前用户的 userId
  getUserInfo() {
    const userId = wx.getStorageSync('userId');
    if (!userId) {
      wx.showToast({
        title: '请先登录',
        icon: 'none'
      });
      return;
    }
    // console.log(userId);
    this.setData({ userId });
    this.fetchClubData(userId);
  },

  // 从数据库中查询社团信息
  fetchClubData(userId) {
    // console.log(userId);
    // 假设你使用的是云数据库，下面的示例是通过云函数获取数据
    wx.cloud.database().collection('test_clubs')
      .where({ club_leader: userId })
      .get()
      .then(res => {
        if (res.data && res.data.length > 0) {
          // 获取 id 最小的一个社团
          const club = res.data.sort((a, b) => a.id - b.id)[0];
          this.setData({
            clubData: club,
            club_name: club.club_name,
            club_class: parseInt(club.club_class),
            club_intro: club.club_intro,
            club_contact: club.club_contact,
            clubId: club._id
          });
        } else {
          wx.showToast({
            title: '没有找到相关社团',
            icon: 'none'
          });
        }
      })
      .catch(err => {
        console.error(err);
        wx.showToast({
          title: '获取社团数据失败',
          icon: 'none'
        });
      });
  },

  // 处理表单输入变化
  onInputChange(e) {
    const { name, value } = e.detail;
    this.setData({ [name]: value });
  },

  // 处理社团类别选择框变化
  onClassChange(e) {
    this.setData({ club_class: e.detail.value });
  },

  // 提交表单
  onSubmit(e) {
    const { club_name, club_class, club_intro, club_contact } = this.data;

    // 检查表单是否完整
    if (!club_name || !club_intro || !club_contact) {
      wx.showToast({
        title: '请填写所有必填字段。',
        icon: 'none'
      });
      return;
    }
    // club_class = parseInt(club_class);
    // 更新数据库
    wx.cloud.database().collection('test_clubs').doc(this.data.clubId)
      .update({
        data: {
          club_name,
          club_class: parseInt(club_class),
          club_intro,
          club_contact
        }
      })
      .then(res => {
        wx.showToast({
          title: '更新成功',
          icon: 'success',
          duration: 800, // 设置显示时长为 800 毫秒（0.8秒）
          success: () => {
            // 显示成功后，延迟 0.8 秒跳转到新页面
            setTimeout(() => {
              wx.navigateTo({
                url: `/pages/test_show_club/index?id=${this.data.clubId}`, // 替换为你想跳转到的页面路径
              });
            }, 800); // 0.8秒后执行跳转
          }
        });
        
      })
      .catch(err => {
        console.error(err);
        wx.showToast({
          title: '更新失败',
          icon: 'none'
        });
      });
  },
  // 删除社团
  onDeleteClub() {
    const clubId = this.data.clubId;
    wx.showModal({
      title: '确认删除',
      content: '你确定要删除这个社团吗？删除后无法恢复。',
      success: (res) => {
        if (res.confirm) {
          // 调用云数据库删除记录
          wx.cloud.database().collection('test_clubs').doc(clubId).remove()
            .then(() => {
              wx.showToast({
                title: '删除成功',
                icon: 'success',
                success: () => {
                  // 删除成功后，跳转到首页或其他页面
                  wx.navigateBack({
                  delta : 1 // 返回上一页
                  });
                }
              });
            })
            .catch(err => {
              console.error(err);
              wx.showToast({
                title: '删除失败',
                icon: 'none'
              });
            });
        }
      }
    });
  }
});
