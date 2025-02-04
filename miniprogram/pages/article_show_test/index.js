// const app = getApp();
// Page({
//   data: {
//     article: {}
//   },
//   onLoad: function (options) {

// //     app.getText('https://www.vvadd.com/wxml_demo/demo.txt?v=2',res => {
// //       let obj = app.towxml(res.data,'markdown',{
        
// //         theme:'light', //主题 dark 黑色，light白色，不填默认是light
// //         base:"www.xxx.com",
// //         events:{      //为元素绑定的事件方法
// //           tap:e => {
// //             console.log('tap',e);
// //           },
// //           change:e => {
// //             console.log('todo',e);
// //           }
// //         }
// //       });
// //       console.log('获取的内容:', res.data);  // 打印获取的内容
// // console.log('转换后的数据:', obj);    // 打印解析后的数据

      
// //       //更新解析数据
// //       this.setData({
// //         article:obj,
// //       });
// //     });


// //     // 获取数据库实例
// //     const db = wx.cloud.database();

// //     // 获取集合（表）
// //     const collection = db.collection('test');

// //     // 查询 id 为 1 的数据
// //     collection.where({
// //       id: 1  // 过滤条件，查找 id 为 1 的数据
// //     }).get({
// //       success(res) {
// //         // 如果查询成功，返回数据
// //         console.log('查询成功:', res.data);
// //         const content = res.data[0].content;
// //         console.log(content);

// //         // // 将 content 转换成所需的格式
// //         // let result = app.towxml('# hi', 'markdown', {
// //         //   base: 'https://xxx.com',  // 相对资源的base路径
// //         //   theme: 'light',            // 主题，默认`light`
// //         //   events: {                 // 为元素绑定的事件方法
// //         //     tap: (e) => {
// //         //       console.log('tap', e);
// //         //     }
// //         //   }
// //         // });

        
// //       },
// //       fail(err) {
// //         // 如果查询失败，输出错误信息
// //         console.error('查询失败:', err);
// //       }
// //     });

// // 确保在回调函数中使用箭头函数，以确保 `this` 上下文正确
// const db = wx.cloud.database();
// const collection = db.collection('test');

// collection.where({
//   id: 1
// }).get({
//   success: (res) => {  // 使用箭头函数，确保 this 指向页面实例
//     console.log('查询成功:', res.data);
    
//     // 获取 content 数据
//     const content = res.data[0].content;
//     console.log(content);
    
      // let obj = app.towxml(content, 'html', {
      //   theme: 'light', // 主题 dark 黑色，light白色，不填默认是light
      //   base: "www.xxx.com",
      //   events: {
      //     tap: e => {
      //       console.log('tap', e);
      //     },
      //     change: e => {
      //       console.log('todo', e);
      //     }
      //   }
      // });

      // // 更新解析数据
      // this.setData({
      //   article: obj,
      // });
//   },
//   fail: (err) => {
//     console.error('查询失败:', err);
//   }
// });

//   }
// });






// 修改后的代码，不要删除前面的


// index.js
Page({
  data: {
    articles: []  // 存储获取到的文章数据
  },

  onLoad: function () {
    this.getArticles();
  },

  // 获取数据库中的文章内容
  getArticles: function() {
    const db = wx.cloud.database();
    const testCollection = db.collection('test');

    testCollection.orderBy('id', 'desc')  // 根据 id 倒序排序
      .field({
        title: true,  // 获取 title 字段
        _id: true     // 获取微信自动分配的 _id 字段
      })
      .get({
        success: res => {
          console.log(res.data);
          this.setData({
            articles: res.data  // 设置获取到的数据到页面数据中
          });
        },
        fail: err => {
          console.error(err);
        }
      });
  },

  // 点击标题跳转到文章详情页
  goToArticlePage: function(e) {
    console.log(this.data.articles);
    const articleId = String(e.currentTarget.dataset.id);
    console.log("Article ID:", articleId);  // 打印检查 _id 是否正确获取
    if (articleId) {
      wx.navigateTo({
        url: `/pages/article_template/index?id=${articleId}`  // 跳转并传递 _id
      });
    } else {
      console.error("Article ID is missing!");
    }
  }
});
