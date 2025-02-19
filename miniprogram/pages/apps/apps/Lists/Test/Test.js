// pages/app/app.js
Page({
    data: {
      buttons: [
        { label: '按钮 1', ripples: [] },
        { label: '按钮 2', ripples: [] },
        { label: '按钮 3', ripples: [] }
      ]
    },
  
    // 点击事件处理函数
    handleButtonClick: function (event) {
      const { index } = event.currentTarget.dataset; // 获取按钮索引
      const { touches } = event;
      if (touches && touches.length > 0) {
        const { clientX, clientY } = touches[0]; // 获取点击位置
        
        let query = wx.createSelectorQuery(); // 创建查询对象
        let id = event.currentTarget.id; // 获取点击元素的 id
        query.select('#' + id).boundingClientRect(function(rect) {
            //console.log('Rect:', rect);
            //console.log(clientX, clientY, rect.top, rect.left)
            const ripple = {
              top: clientY - rect.top,
              left: clientX - rect.left,
            };
            // 更新对应按钮的 ripples 数据
            const buttons = this.data.buttons;
            buttons[index].ripples = [...buttons[index].ripples, ripple].slice(-3); // 最多保留 3 个动画
            this.setData({ buttons });
            // 动画结束后移除
            setTimeout(() => {
              buttons[index].ripples = buttons[index].ripples.slice(1); // 移除第一个动画
              this.setData({ buttons });
            }, 600); // 动画持续时间
          }.bind(this)) // 使用 bind 保持 this 的指向
          .exec(); 
      }
    }
  });
