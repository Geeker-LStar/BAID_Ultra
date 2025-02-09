Page({
  data: {
    clubClasses: ["学科学术类", "文艺创作类", "多元探索类"],
    clubClassIndex: 0,
    posterUrl: '', // 社团海报
    syllabusFileName: '', // 社团课程大纲文件名
  },

  // 选择社团归类
  onClassChange(e) {
    this.setData({
      clubClassIndex: e.detail.value,
    });
  },

  // 选择社团海报
  choosePoster() {
    wx.chooseImage({
      success: (res) => {
        this.setData({
          posterUrl: res.tempFilePaths[0],
        });
      },
    });
  },

  // 选择社团课程大纲文件
  chooseSyllabus() {
    wx.chooseMessageFile({
      count: 1,
      type: 'file',
      extension: ['pdf', 'docx', 'doc'],
      success: (res) => {
        this.setData({
          syllabusUrl: res.tempFiles[0].path,
          syllabusFileName: res.tempFiles[0].name,
        });
      },
    });
  },

  // 提交表单
  onFormSubmit(e) {
    const formData = e.detail.value;
    console.log(formData);
    const { clubClassIndex, posterUrl, syllabusUrl } = this.data;
    
    // 条件判断，如果有必填项没有填写则给出提示
    if (formData.club_name == "" || formData.club_intro == "" || formData.club_contact == "") {
      wx.showToast({
        title: '请填写所有必填项。',
        icon: 'none',
        duration: 2000
      });
    }
    else {
         // 获取社长的 userId
    const userId = wx.getStorageSync('userId');  // 从缓存中获取用户的 userId
    
    // 获取数据库实例
    const db = wx.cloud.database();
    const collection = db.collection('test_clubs');
    // 查询集合中最大 ID
    collection.orderBy('club_id', 'desc').limit(1).get({
      success(res) {
        let nextId = 1;  // 默认情况下，如果没有数据，ID 应该从 1 开始

        if (res.data.length > 0) {
          // 如果有数据，获取最大 ID，递增 1
          nextId = res.data[0].club_id + 1;
        }

        // 获取社团数据
        const clubData = {
          club_id: nextId,
          club_name: formData.club_name,
          club_leader: userId,
          club_class: parseInt(clubClassIndex),
          club_intro: formData.club_intro,
          club_contact: formData.club_contact,
        };

        // 向 test_club 中写入数据
        wx.cloud.database().collection('test_clubs').add({
          data: clubData,
          success: (res) => {
            console.log("新建社团数据插入成功！");
            const clubId = res._id; // 获取新创建的社团 _id

            // 更新用户权限
            wx.cloud.database().collection('test_users').where({
              userId: userId
            }).get({
              success: res => {
                if (res.data.length > 0) {
                  // 文档存在，更新 auth 字段
                  const docId = res.data[0]._id;
                  wx.cloud.database().collection('test_users').doc(docId).update({
                    data: {
                      auth: wx.cloud.database().command.push('club_leader')
                    }
                  }).then(() => {
                    console.log('用户权限更新成功');
                  }).catch(err => {
                    console.error('用户权限更新失败', err);
                  });
                } else {
                  // 文档不存在，新建文档
                  wx.cloud.database().collection('test_users').add({
                    data: {
                      userId: userId,
                      auth: ['club_leader']
                    }
                  }).then(() => {
                    console.log('用户权限创建+更新成功');
                  }).catch(err => {
                    console.error('用户创建+更新失败', err);
                  });
                }
              },
              fail: err => {
                console.error('查找文档失败', err);
              }
            });

            // 开始上传海报和课程大纲，并等待它们上传完成
            wx.showToast({
              title: '等待文件上传...',
              icon: 'loading',
              duration: 150000000  // 设置为合理的显示时长
            });

            // 上传海报和课程大纲的 Promise 数组
            const uploadPromises = [];

            // 上传海报
            if (posterUrl) {
              const posterSuffix = posterUrl.split('.').pop();
              const posterPath = `club_posters/${clubId}.${posterSuffix}`;
              uploadPromises.push(new Promise((resolve, reject) => {
                wx.cloud.uploadFile({
                  cloudPath: posterPath,
                  filePath: posterUrl,
                  success: () => {
                    console.log("海报上传成功");
                    resolve();
                  },
                  fail: (err) => {
                    console.error("海报上传失败", err);
                    wx.showToast({
                      title: '海报上传失败，请稍后重试',
                      icon: 'none',
                      duration: 2000
                    });
                    reject(err);
                  },
                });
              }));
            }

            // 上传课程大纲
            if (syllabusUrl) {
              const syllabusSuffix = syllabusUrl.split('.').pop();
              const syllabusPath = `club_syllabus/${clubId}.${syllabusSuffix}`;
              uploadPromises.push(new Promise((resolve, reject) => {
                wx.cloud.uploadFile({
                  cloudPath: syllabusPath,
                  filePath: syllabusUrl,
                  success: () => {
                    console.log("课程大纲上传成功");
                    resolve();
                  },
                  fail: (err) => {
                    console.error("课程大纲上传失败", err);
                    wx.showToast({
                      title: '课程大纲上传失败，请稍后重试',
                      icon: 'none',
                      duration: 2000
                    });
                    reject(err);
                  },
                });
              }));
            }

            // 等待所有上传操作完成
            Promise.all(uploadPromises).then(() => {
              // 所有文件上传成功后，跳转到新的页面
              wx.redirectTo({
                url: `/pages/test_show_club/index?id=${clubId}`,
              });
            }).catch((err) => {
              console.error("上传失败", err);
            });

          },
          fail: (err) => {
            console.error("插入社团数据失败", err);
            wx.showToast({
              title: '插入社团数据失败，请稍后重试',
              icon: 'none',
              duration: 2000
            });
          },
        });
      },
    });
    }
  },
});
