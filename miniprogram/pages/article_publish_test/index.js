

Page({
  /**
   * 页面的初始数据
   */
  data: {
    openUrl: "https://geekerlstar.com/baidultra/test.php",
  },
  /**
   * 获取请求数据
   */
  handleGetMessage: function (e) {
    console.log(e.detail.data)
    const data = e.detail.data[0];
    if (data) {
      const title = data.title;
      const content = data.content;
      const publisher = data.publisher;
      const publish_time = data.publish_time
      console.log(title); 
      console.log(content);  
      console.log(publisher);
      console.log(publish_time);   
      
      // 写入数据库
      // 获取数据库实例
const db = wx.cloud.database();

// 获取集合（表）
const collection = db.collection('test');

// 查询集合中最大 ID
collection.orderBy('id', 'desc').limit(1).get({
  success(res) {
    let nextId = 1;  // 默认情况下，如果没有数据，ID 应该从 1 开始

    if (res.data.length > 0) {
      // 如果有数据，获取最大 ID，递增 1
      nextId = res.data[0].id + 1;
    }

    // 插入新数据
    collection.add({
      data: {
        id: nextId, // 使用计算出来的递增 ID
        title: title,
        content: content,
        publisher: publisher,
        publish_time: publish_time,
        is_show: 1
      },
      success(insertRes) {
        console.log('数据插入成功', insertRes);
      },
      fail(err) {
        console.error('数据插入失败', err);
      }
    });
  },
  fail(err) {
    console.error('查询最大 ID 失败', err);
  }
});


    } else {
      console.log('data 为空。');
    }
  }
  

  },)