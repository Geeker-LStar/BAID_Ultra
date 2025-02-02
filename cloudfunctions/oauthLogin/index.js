const cloud = require('wx-server-sdk');
cloud.init();

exports.main = async (event, context) => {
  const { username, password } = event;

  // 确认云函数开始执行
  console.log('云函数开始执行');
  console.log('用户名:', username, '密码:', password);

  try {
    console.log('准备发送 OAuth 请求');
    
    // 发送请求时，添加 Content-Type 头部
    const response = await require('axios').post('https://open.seiue.com/api/v3/oauth/tokens', {
      grant_type: 'password',
      username,
      password,
      client_id: 'UFLZnBRrKT0U14f9hvkPbw',
      client_secret: 'lOjTbHjwLTFKhDmbljEzBfmnKZk3FJEa' 
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    // 打印成功返回的所有字段
    console.log('OAuth 请求成功:', response.data);

    // 如果返回成功，输出详细的成功信息
    if (response.status === 201) {
      console.log('token_type:', response.data.token_type);
      console.log('expires_in:', response.data.expires_in);
      console.log('access_token:', response.data.access_token);
      console.log('refresh_token:', response.data.refresh_token);
    }

    // 返回 Access Token 给客户端
    return {
      code: 200,
      data: {
        access_token: response.data.access_token
      }
    };
  } catch (error) {
    console.error('OAuth 请求错误:', error); // 输出错误信息

    // 如果请求失败，输出详细的错误信息
    if (error.response) {
      console.log('错误返回:', error.response.data);
    } else if (error.message) {
      console.error('登录失败: ' + error.message);
      console.log('错误返回:', error.response.data);
    }

    let message = '登录失败: 未知错误';
    if (error.response && error.response.data) {
      message = '登录失败: ' + error.response.data.error_description || error.response.data.message || '未知错误';
    } else if (error.message) {
      message = '登录失败: ' + error.message;
    }

    // 返回错误信息
    return {
      code: 400,
      message: message
    };
  }
};
