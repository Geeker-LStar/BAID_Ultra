// pages/apps/apps/Lists/Test/subpage/subpage.js
Page({
    ButtonRippleClick() {
        const rippleBtn = this.selectComponent("#ripple-button"); // 获取组件实例
        if (rippleBtn) {
          rippleBtn.ButtonRippleClick(); // 调用组件方法
        }
    }
})