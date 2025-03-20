Component({
    properties: {
      name: {
        type: String,
        value: "home"
      },
      size: {
        type: Number,
        value: 24
      },
      color: {
        type: String,
        value: "#333"
      }
    },
    data: {
      svgPath: ""
    },
    lifetimes: {
      attached() {
        this.setData({
          svgPath: icons[this.data.name] || ""
        });
      }
    }
  });