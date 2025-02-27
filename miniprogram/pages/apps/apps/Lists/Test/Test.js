const buttonEffects = require("../../../../../behaviors/animation/animation");

Page({
  behaviors: [buttonEffects], // 直接应用行为
  data: {
    buttons: [
      { label: "按钮 1", ripples: [] },
      { label: "按钮 2", ripples: [] }
    ]
  },
  /*handleButtonClick(e) {
    console.log("普通按钮点击", e);
  }*/
});