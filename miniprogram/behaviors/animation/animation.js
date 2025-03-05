module.exports = Behavior({
    data: {
      ripples: [],
    },
  
    methods: {
        Redirect: function(directpage) {
            if (directpage) {
                wx.navigateTo({
                    url: directpage, // 目标页面路径
                    fail: (err) => {
                        console.error("页面跳转失败:", err);
                    }
                });
            } else {
                console.log("directPage is UNDEFINED");
            }
        }, 

        NormalRedirect: function(event) {
            const { directpage } = event.currentTarget.dataset;
            this.Redirect(directpage);
        },

        ButtonRippleClick: function (event) {
            const { directpage, index } = event.currentTarget.dataset; // 获取dataset
            const { touches } = event;
            if (touches && touches.length > 0) {
              const { clientX, clientY } = touches[0]; // 获取点击位置
              let query = this.createSelectorQuery(); // 创建查询对象
              let id = event.currentTarget.id; // 获取点击元素的 id
              query.select('#' + id).boundingClientRect(function(rect) {
                  //console.log('Rect:', rect);
                  //console.log(clientX, clientY, rect.top, rect.left);
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
                    
                    // 动画结束后执行Redirect
                    this.Redirect(directpage);
                  }, 600); // 动画持续时间
                }.bind(this)) // 使用 bind 保持 this 的指向
                .exec(); 
            }
        }
    }
});
  