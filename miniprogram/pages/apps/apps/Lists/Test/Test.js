const buttonEffects = require("../../../../../behaviors/animation/animation");

Page({
  behaviors: [buttonEffects], // 直接应用行为
  data: {
    buttons: [
      { label: "扩散 1", ripples: [] },
      { label: "扩散 2", ripples: [] }
    ]
  },
});