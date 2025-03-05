const buttonEffects = require("../../../../../behaviors/animation/animation");

Page({
  behaviors: [buttonEffects], // 直接应用行为
  data: {
    buttons: [
      { label: "扩散 1", ripples: [], link: "./subpage/subpage" },
      { label: "扩散 2", ripples: [], link: "./subpage/subpage" },
      { label: "扩散 3", ripples: [], link: "./subpage/subpage" },
      { label: "扩散 4", ripples: [], link: "" },
      { label: "扩散 5", ripples: [], link: "" },
    ]
  },
});