Page({
  data: {
    clubName: '',         // 社团名称
    clubHead: '',         // 社长
    clubIntro: '',        // 社团简介
    clubClass: '',        // 社团类别
    clubContact: '',      // 社长联系方式
    clubPoster: '',       // 社团海报
    syllabusUrl: '',      // 社团课程大纲
    showWebView: false
  },

  // 页面加载时，获取社团信息
  onLoad: function (options) {
    const clubId = options.id;
    this.loadClubDetails(clubId);
  },

  // 点击后切换状态，显示 web-view
  onClickShowWebView: function() {
    this.setData({
      showWebView: true  // 点击后将 showWebView 设置为 true，显示 web-view
    });
  },

  onWebViewBack() {
    console.log('Web-view back triggered'); // 检查是否触发
    wx.redirectTo({
      url: `/pages/test_show_club/index?id=${clubId}`,
    })
  },

  // 获取社团详细信息
  loadClubDetails: function (clubId) {
    // 查询社团信息
    wx.cloud.database().collection('test_clubs')
      .doc(clubId)
      .get()
      .then(res => {
        const clubData = res.data;
        const clubClass = this.getClubClassName(clubData.club_class);

        this.setData({
          clubName: clubData.club_name || '',
          clubHead: clubData.club_leader || '',
          clubIntro: clubData.club_intro || '',
          clubClass: clubClass,
          clubContact: clubData.club_contact || '',
        });

        // 获取社团海报
        this.getFileUrl(clubId, 'club_posters').then(url => {
          this.setData({ clubPoster: url });
        });

        // 获取社团课程大纲
        this.getFileUrl(clubId, 'club_syllabus').then(url => {
          console.log(url);
          this.setData({ syllabusUrl: url });
        });
      })
      .catch(err => {
        console.error('获取社团信息失败', err);
      });
  },

  // 获取社团类别名称
  getClubClassName: function (clubClass) {
    switch (clubClass) {
      case 0: return '学科学术类';
      case 1: return '文艺创作类';
      case 2: return '多元探索类';
      default: return '暂无内容';
    }
  },

  // 获取云存储文件的 URL
getFileUrl: function (clubId, fileUrl) {
  if (fileUrl == "club_posters") {


  return new Promise((resolve, reject) => {
    // 常见的图片扩展名列表
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp'];
    
    // 遍历扩展名列表
    let checkNextExtension = (index) => {
      if (index >= imageExtensions.length) {
        // console.log(1);
        resolve(''); // 如果所有扩展名都没有文件，返回空
        return;
      }
      
      const fileID = `cloud://baid-ultra-official-9css8ac4b5e7.6261-baid-ultra-official-9css8ac4b5e7-1338879792/${fileUrl}/${clubId}${imageExtensions[index]}`;
      console.log(fileID);
      
      // 调用 wx.cloud.getTempFileURL() 获取 URL
      wx.cloud.getTempFileURL({
        fileList: [{
          fileID: fileID,
        }],
        success: res => {
          if (res.fileList && res.fileList[0].status === 0) {
            // 如果文件存在，返回 URL
            console.log("exist");
            console.log(res.fileList[0]);
            resolve(res.fileList[0].tempFileURL);
          } else {
            // 文件不存在，继续检查下一个扩展名
            checkNextExtension(index + 1);
          }
        },
        fail: err => {
          reject(err);
          resolve(''); // 如果失败，返回空
        }
      });
    };
    
    // 开始检查第一个扩展名
    checkNextExtension(0);
  });
}
if (fileUrl == "club_syllabus") {
  return new Promise((resolve, reject) => {
    // 常见的图片扩展名列表
    const imageExtensions = ['.pdf', '.docx'];
    
    // 遍历扩展名列表
    let checkNextExtension = (index) => {
      if (index >= imageExtensions.length) {
        resolve(''); // 如果所有扩展名都没有文件，返回空
        return;
      }
      
      const fileID = `cloud://baid-ultra-official-9css8ac4b5e7.6261-baid-ultra-official-9css8ac4b5e7-1338879792/${fileUrl}/${clubId}${imageExtensions[index]}`;
      console.log(fileID);
      
      // 调用 wx.cloud.getTempFileURL() 获取 URL
      wx.cloud.getTempFileURL({
        fileList: [{
          fileID: fileID,
        }],
        success: res => {
          if (res.fileList && res.fileList[0].status === 0) {
            // 如果文件存在，返回 URL
            console.log("exist");
            resolve(res.fileList[0].tempFileURL);
          } else {
            // 文件不存在，继续检查下一个扩展名
            checkNextExtension(index + 1);
          }
        },
        fail: err => {
          reject(err);
          resolve(''); // 如果失败，返回空
        }
      });
    };
    
    // 开始检查第一个扩展名
    checkNextExtension(0);
  });
}
}

});
