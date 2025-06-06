//const { success } = require("./i18n/bug_report/en");
import { checkName } from "./utils/checkName";
import { checkDevice } from "./utils/checkDevice";


// app.js
App({
    async onLaunch() {
        if (!wx.cloud) {
            console.error("请使用 2.2.3 或以上的基础库以使用云能力");
        } else {
            wx.cloud.init({
                // env 参数说明：
                //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
                //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
                //   如不填则使用默认环境（第一个创建的环境）
                env: "baid-ultra-official-9css8ac4b5e7",
                traceUser: true,
            });
            const buttonEffects = require("./behaviors/animation/animation");
            behaviors: [buttonEffects];
        }

        this.globalData = {
            // 设置“设置”页面内数据
            // 变量名称解释
            // btSts: buttonStatus（按钮的开、关）
            // btBgCl: buttonBackgroundColor
            // btArcCl: buttonArcColor（控制按钮内小圆圈的颜色）
            btArcCl: {
            true: '#FFFFFF',
            false: '#FAFAFA',
            },
            btBgCl: {
            true: '#2D608A',
            false: '#09090D',
            },
            // 所有按钮canvas的wxml的id
            canvasId: [
            '#activateNotifications', // 开启通知
            '#darkModeOn', // 打开深色模式
            ],
            Bgcolor: '#F0F0F0'
        };

        // “设置”内按钮状态
        for (const id of this.globalData.canvasId) {
            if (wx.getStorageSync(id) == '') {
            // 如果有按钮信息为空，就将执行重置程序。
            console.warn('检测到本地存储的设置选项缺失，已重置设置的全部选项！');
            wx.setStorageSync('#activateNotifications', true);
            wx.setStorageSync('#darkModeOn', true);
            break;
            };
        };

        // 检测语言设置
        if (wx.getStorageSync('lang') == '') {
            console.warn('检测到本地存储的语言设置缺失，已重置为简体中文（zh）！');
            wx.setStorageSync('lang', 'zh');
        };
        this.setTheme();
        wx.onThemeChange(({ theme }) => {
            this.updateTheme(theme);
        });

        // 检查云端昵称
        checkName();

        // 检查超时退登
        const db = wx.cloud.database();
        db.collection('devices').doc(String(wx.getStorageSync('userId'))).get({
          success: (res) => {
            console.log(res);
            const devices = res.data.devices;
            if (devices[wx.getStorageSync('randomID')].logInTime + 604800000 /*一周*/ < Date.now()) {
              devices[wx.getStorageSync('randomID')].off = true;
              db.collection('devices').doc(String(wx.getStorageSync('userId'))).update({
                data: {
                  devices: devices,
                },
                success: (res) => {
                  console.log(res);
                },
              });
            };
          },
          fail: (err) => {console.error(err);},
        });

        // 检查设备信息
        checkDevice();

    }, //END OF ONLAUNCH

    async setTheme() {
        try {
            const theme = wx.getAppBaseInfo().theme;
            this.updateTheme(theme);
        } catch (err) {
            console.error("获取主题失败:", err);
            this.updateTheme("light"); // 默认浅色
        }
    },

    updateTheme(theme) {
        const Bgcolor = theme === "dark" ? "#262626" : "#f0f0f0";
        wx.setStorageSync("Bgcolor", Bgcolor);
        this.globalData.Bgcolor = Bgcolor;

        // 设置导航栏颜色（同步 UI 体验）
        wx.setNavigationBarColor({
            frontColor: theme === "dark" ? "#ffffff" : "#000000",
            backgroundColor: Bgcolor
        });

        // 更新当前页面数据
        const pages = getCurrentPages();
        if (pages.length) {
            pages[pages.length - 1].setData({ Bgcolor });
        }
    },

    //配置MD解析器
    towxml: require('/towxml/index'),
    getText: (url, callback) => {
        wx.request({
            url: url,
            header: { 'content-type': 'application/x-www-form-urlencoded' },
            success: (res) => {
                if (typeof callback === 'function') {
                    callback(res);
                }
            },
            fail(err) {
                console.error('请求失败', err);
            }
        });
    },
});