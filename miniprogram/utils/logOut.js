export function logOut() {
  // 多语言
  let texts = null;
  if (wx.getStorageSync('lang') == 'en') {
    texts = require('../i18n/log_out/en.js');
  } else {
    texts = require('../i18n/log_out/zh.js');
  };
  // 存储的和用户信息相关的全都删掉
  wx.removeStorageSync('name');
  wx.removeStorageSync('pinyin');
  wx.removeStorageSync('role');
  const db = wx.cloud.database();
  const userID = wx.getStorageSync('userId').toString();
  console.log(userID);
  db.collection('devices').doc(userID).get({
    success: (res) => {
      console.log(res);
      const devices = res.data.devices;
      console.log(devices);
      devices[wx.getStorageSync('randomID')].off = true;
      db.collection('devices').doc(userID).update({
        data: {
          devices: devices,
        },
        success: (res) => {
          console.log(res);
        },
      });
    },
    fail: (err) => {
      console.warn(err);
    },
  });
  wx.removeStorageSync('userId');
  wx.switchTab({
    url: '/pages/me/index',
  });
  wx.showToast({
    title: texts.log_out,
  });
};