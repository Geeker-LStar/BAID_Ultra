// 判断设备ID是否在云端
import { randomID } from "./randomID";
import { logOut } from "./logOut";

export function checkDevice () {
  if (wx.getStorageSync('userId') != '') {
    // 检查云端是否有数据
    const db = wx.cloud.database();
    db.collection('devices').doc(String(wx.getStorageSync('userId'))).get({
      success: (res) => {
        // 检查设备ID
        if (wx.getStorageSync('randomID') == '') {
          // 设立新ID
          wx.setStorageSync('randomID', randomID());
          // 已经设立新ID，再次检查必然进入else块
          checkDevice();
        } else {
          // 设备ID正常，检查云端是否记录有该设备
          let devices = res.data.devices;
          if (devices[wx.getStorageSync('randomID')] == undefined) {
            // 没有记录该设备
            devices[wx.getStorageSync('randomID')] = {
              logInTime: Date.now(),
              model: wx.getDeviceInfo().model,
              off: false,
            };
            db.collection('devices').doc(String(wx.getStorageSync('userId'))).update({
              data: {
                devices: devices,
              },
              success: (res) => {
                console.log(res);
              },
            });
          };
          // 检查完毕，已确保云端记录了该设备的信息
          // 更新本设备登录时间
          devices[wx.getStorageSync('randomID')].logInTime = Date.now();
          devices[wx.getStorageSync('randomID')].off = false;
          db.collection('devices').doc(String(wx.getStorageSync('userId'))).update({
            data: {
              devices: devices,
            },
            success: (res) => {
              console.log(res);
            },
          });
          // 检查其他设备登录超时
          for (const randomID in devices) {
            let logInTime = devices[randomID].logInTime;
            if (logInTime + 604800000 /*一周*/ < Date.now()) {
              devices.randomID.off = true // 设备超时退登
            };
          };
          // 检查退登
          setInterval(() => {
            //console.log(res.data.devices[wx.getStorageSync('randomID')].off);
            db.collection('devices').doc(String(wx.getStorageSync('userId'))).get({
              success: (result) => {
                if (result.data.devices[wx.getStorageSync('randomID')].off) {
                  // off值为true，说明退登
                  logOut();
                }
              },
            });
          }, 1000)
        };
      },
      fail: (err) => {
        // 读取失败
        console.warn(`云端无该账号的设备数据！\n${err}`)
        db.collection('devices').add({
          data: {
            _id: wx.getStorageSync('userId'), // _id是userId，对应每一个账号
            devices: {}, // 对象的索引是randomID，属性是另一个对象
          },
          success: (res) => {
            // 已经初始化设备数据，重新检查必将进入success回调
            checkDevice();
          },
        });
      },
    });
  };
};
