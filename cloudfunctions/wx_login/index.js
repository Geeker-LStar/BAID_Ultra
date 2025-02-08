// 云函数入口文件
const cloud = require('wx-server-sdk');
const axios = require('axios');  // 你也可以使用 Node.js 原生的 http 模块

cloud.init();

exports.main = async (event, context) => {
  const { code } = event;  // 从前端传递的 code
  
  // 获取小程序的 AppID 和 AppSecret
  const appid = 'wxd7efe77f079570cf';  // 你的 AppID
  const secret = '97f64c0986b3eea630937cd9d125eb45';  // 你的 AppSecret

  // 请求微信接口获取 openid 和 session_key
  try {
    const response = await axios.get('https://api.weixin.qq.com/sns/jscode2session', {
      params: {
        appid: appid,
        secret: secret,
        js_code: code,
        grant_type: 'authorization_code'
      }
    });

    const { openid, session_key } = response.data;
    if (openid) {
      // 返回 openid 和 session_key 给前端
      return {
        openid,
        session_key
      };
    } else {
      return {
        error: '获取 openid 失败',
      };
    }
  } catch (error) {
    console.error('获取 openid 错误', error);
    return {
      error: '调用微信接口失败',
    };
  }
};
