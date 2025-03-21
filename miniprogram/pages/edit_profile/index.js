// pages/edit_profile/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    texts: null,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.editProfileProcess();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    if (wx.getStorageSync('lang') == 'en') {
      this.setData({
        texts: require("../../i18n/edit_profile/en.js"),
      });
    } else {
      this.setData({
        texts: require("../../i18n/edit_profile/zh.js"),
      });
    };
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },

  // 更改头像流程
  editProfileProcess() {
    wx.chooseMedia({
      count: 1,
      mediaType: 'image',
      success: (res) => {
        console.log('选择文件成功'); 
        let imagePath = res.tempFiles[0].tempFilePath;
        let delay = 200;

        // 延迟delay毫秒后进入裁剪
        setTimeout(() => {
          wx.cropImage({
            src: imagePath,
            cropScale: '1:1',
            success: (res) => {
              console.log('裁剪文件成功');
              imagePath = res.tempFilePath;
              //#region 将头像展示在canvas里
              // 获取屏幕宽度VW
              const screen_width = wx.getWindowInfo().screenWidth;
              const VW = screen_width / 100;
              wx.createSelectorQuery()
                .select('#profilePreview')
                .fields({node: true, size: true})
                .exec((res) => {
                  // 初始化
                  const canvas = res[0].node;
                  const ctx = canvas.getContext('2d');
                  const width = res[0].width;
                  const height = res[0].height;
                  const dpr = wx.getWindowInfo().pixelRatio;
                  canvas.width = width * dpr;
                  canvas.height = height * dpr;
                  ctx.scale(dpr, dpr);

                  // 绘制头像的灰色背景
                  ctx.fillStyle = '#262626';
                  ctx.fillRect(0, 0, 75*VW, 75*VW); 
                  //ctx.draw();

                  // 绘制图片
                  const img = canvas.createImage();
                  img.src = imagePath;
                  console.log(img);
                  img.onload = () => {
                    ctx.save();
                    ctx.beginPath();
                    ctx.arc(35*VW, 35*VW, 35*VW, 0, 2*Math.PI);
                    ctx.clip();
                    ctx.drawImage(img, 0, 0, 70*VW, 70*VW);
                    ctx.restore();
                    //#endregion
                    // 将画布导出图片文件并上传到云端
                    wx.canvasToTempFilePath({
                      canvasId: '#profilePreview',
                      canvas: canvas,
                      fileType: 'jpg',
                      success: (res) => {
                        console.log(res);
                        imagePath = res.tempFilePath;
                        // 延迟中，将头像上传至云端
                        delay = 300;
                        wx.showToast({ // 裁切完毕后立即展示
                          title: this.data.texts.uploading,
                          icon: 'loading',
                          duration: delay,
                        });
                        wx.cloud.uploadFile({
                          cloudPath: `profile_imgs/${wx.getStorageSync('userId')}.jpg`,
                          filePath: imagePath,
                          success: (res) => {
                            console.log('已经成功上传头像至云端！');
                          },
                          fail: (err) => {
                            console.error(err);
                          },
                        });
                        setTimeout(() => {
                          setTimeout(() => { // 展示成功（1000毫秒）后立刻回退
                            wx.navigateBack({
                              delta: 1,
                            });
                          }, 1000);
                          wx.showToast({ // 上传后300毫秒展示，展示时间1000毫秒
                            title: this.data.texts.success,
                            icon: 'success',
                            duration: 1000,
                          });
                        }, delay)
                      },
                      fail: (err) => {
                        console.error(err);
                      },
                    });
                  };
              });
              //#endregion
            },
            fail: (err) => {
              // 裁剪媒体失败
              console.log(err);
            },
          });
        }, delay);
        wx.showToast({
          title: this.data.texts.processing,
          icon: 'loading',
          duration: delay,
        });

      },
      fail: (err) => {
        // 选择媒体失败
        console.log(err);
      },
    });
    
  },

})
