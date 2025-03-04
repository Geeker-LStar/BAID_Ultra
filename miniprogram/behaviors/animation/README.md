# Better animations
为按钮准备的动效文件。
## 使用方法：
### JS
JS进行require并绑定behaviors便可使用
```javascript
const buttonEffects = require("../../../../../behaviors/animation/animation");
//路径指向behaviors/animation/animation.js
Page({
  behaviors: [buttonEffects], // 直接应用行为
 //下面为样例
  data: {
    buttons: [
      { label: "扩散 1", ripples: [] },
      { label: "扩散 2", ripples: [] }
    ]
  },
});
```
### WXSS
和JS类似，WXSS也只需要在前面进行import就行了（但是路径比较麻烦）
```css
@import "../../../../../behaviors/animation/animation.wxss";
/*路径指向behaviors/animation/animation.wxss*/
.custom-button { /*自己按钮的样式*/
    width: 200px;
    height: 50px;
    border-radius: 10px;
    background-color: #007bff;
    color: #fff;
    font-size: 16px;
    border: none;
    position: relative;
  }
```
### WXML
参数比较多，下面进行解释
```
[1]data-directpage 页面跳转的路径，使用navigateto

[2]bindtap 绑定的函数，若使用扩散效果写bindtap="ButtonRippleClick"

[3]id 按钮的识别标志，可以使用类似"btn{{index}}"方式进行标号，扩散效果需要通过此标志获取

[4]data-index直接写={{index}}就行了

[5]hover-class按钮的正常效果（CSS效果），可以与扩散（JS效果）叠加
```
```html
<!--多按钮-->
<view class="button-container">
  <block wx:for="{{buttons}}" wx:key="index">
    <view class="button-wrapper">
      <button 
        class="custom-button"  <!--自己WXSS的样式-->
        bindtap="ButtonRippleClick"  <!--动效函数-->
        data-index="{{index}}"
        id="btn{{index}}" <!--一定要有ID，是动效函数生效的关键-->
        hover-class="button-item-active" <!--简单的变大变小，效果可重叠-->
        data-directpage="./subpage/subpage" <!--跳转路径设置-->
      >
        {{item.label}}
      </button>
      <!-- 动画容器 -->
      <view class="ripple-container">
        <view 
          wx:for="{{item.ripples}}" 
          wx:key="rippleIndex" 
          class="ripple" 
          style="top: {{item.top}}px; left: {{item.left}}px;"
        ></view>
      </view>
    </view>
  </block>



  <button 
    class="custom-button" 
    data-index="{{index}}"
    hover-class="button-item-active"
    data-directpage="./subpage/subpage"
  >
    仅大小变化动画
  </button>

  <button 
    class="custom-button" 
    data-index="{{index}}"
    id="btn_independent"
    hover-class="button-item-active"
    data-directpage="./subpage/subpage"
  >
    扩散(独立)
  </button>
</view>
```